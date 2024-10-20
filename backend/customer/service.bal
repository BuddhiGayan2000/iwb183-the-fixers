// customer service is for handling customer registration and login. 
// The service is secured with JWT authentication.
// Resources are:
//     - register: User registration
//     - login: User login
//     - get: Get user by ID
//     - put: Update user by ID
//     - delete: Delete user by ID

import ballerina/crypto;
import ballerina/http;
import ballerina/jwt;
import ballerina/uuid;
import ballerinax/mongodb;

configurable string host = ?;
configurable int port = ?;

configurable string username = ?;
configurable string password = ?;
configurable string database = ?;

configurable string secret_key = "TZiq/jhpastYzsB7F042qlg/n5BjUvIur76i5O1Z4iw=";

configurable string privateKeyFile = "resources/private.key";

// MongoDB client setup
final mongodb:Client mongoDb = check new ({
    connection: {
        serverAddress: {
            host,
            port
        },
        auth: <mongodb:ScramSha256AuthCredential>{
            username,
            password,
            database
        }
    }
});

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://10.0.2.2","*"],
        allowMethods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"]
    }
}

service /users on new http:Listener(9090) {
    private final mongodb:Database db;

    function init() returns error? {
        self.db = check mongoDb->getDatabase("DizposeDB");
    }

    // User registration
    resource function post register(UserInput input) returns string|error {
        mongodb:Collection usersCollection = check self.db->getCollection("Users");
        string userId = uuid:createType1AsString();

        string dataString = input.password;
        byte[] data = dataString.toBytes();
        byte[] hashedData = crypto:hashSha256(data);
        string hashedPassword = hashedData.toBase64();

        User user = {
            id: userId,
            name: input.name,
            email: input.email,
            phone: input.phone,
            address: input.address,
            password: hashedPassword
        };

        check usersCollection->insertOne(user);
        return string `User ${input.name} registered successfully`;
    }

    // User login 
    resource function post login(LoginInput input) returns json|error {
        mongodb:Collection usersCollection = check self.db->getCollection("Users");

        stream<User, error?> resultStream = check usersCollection->find({
            email: input.email
        });

        record {User value;}|error? result = resultStream.next();

        if result is error? {
            return error(string `Invalid credentials: User with email ${input.email} not found.`);
        }

        User user = result.value;

        string inputPasswordHashed = crypto:hashSha256(input.password.toBytes()).toBase64();

        if user.password != inputPasswordHashed {
            return error("Invalid credentials: Incorrect password.");
        }

        jwt:IssuerConfig issuerConfig = {
            username: user.id,
            issuer: "buddhi",
            audience: "customer",
            expTime: 2592000,
            signatureConfig: {
                config: {
                    keyFile: privateKeyFile
                }
            }
        };

        //issue jwt
        string jwtToken = check jwt:issue(issuerConfig);

        return {message: "Login successful", token: jwtToken, user: {id: user.id, name: user.name, email: user.email, phone: user.phone, address: user.address}};
    }

    @http:ResourceConfig {
        auth: [
            {
                jwtValidatorConfig: {
                    issuer: "buddhi",
                    audience: "customer",
                    signatureConfig: {
                        certFile: "resources/public.crt"
                    }
                }
            }
        ]
    }

    // Get user by ID
    resource function get [string id]() returns User|error {
        mongodb:Collection usersCollection = check self.db->getCollection("Users");

        stream<User, error?> resultStream = check usersCollection->find({
            id: id
        });

        record {User value;}|error? result = resultStream.next();

        if result is error? {
            return error(string `Cannot find the user with id: ${id}`);
        }
        return result.value;
    }

    @http:ResourceConfig {
        auth: [
            {
                jwtValidatorConfig: {
                    issuer: "buddhi",
                    audience: "customer",
                    signatureConfig: {
                        certFile: "resources/public.crt"
                    }
                }
            }
        ]
    }

    // Update user by ID
    resource function put [string id](UserInput input) returns string|error {
        mongodb:Collection usersCollection = check self.db->getCollection("Users");

        map<string> updateFields = {};

        if input.name != "" {
            updateFields["name"] = input.name;
        }
        if input.email != "" {
            updateFields["email"] = input.email;
        }
        if input.phone != "" {
            updateFields["phone"] = input.phone;
        }
        if input.address != "" {
            updateFields["address"] = input.address;
        }
        if input.password != "" {
            updateFields["password"] = input.password;
        }
        if updateFields.length() == 0 {
            return error("No fields provided for update.");
        }

        var updateResult = check usersCollection->updateOne(
        {"id": id},
        {"set": updateFields}
        );

        if updateResult.matchedCount > 0 {
            return string `User ${id} updated successfully.`;
        } else {
            return error("User not found or no updates made.");
        }
    }

    @http:ResourceConfig {
        auth: [
            {
                jwtValidatorConfig: {
                    issuer: "buddhi",
                    audience: "customer",
                    signatureConfig: {
                        certFile: "resources/public.crt"
                    }
                }
            }
        ]
    }

    // Delete user by ID
    resource function delete [string id]() returns string|error {
        mongodb:Collection usersCollection = check self.db->getCollection("Users");

        var deleteResult = check usersCollection->deleteOne({"id": id});

        if deleteResult.deletedCount > 0 {
            return string `User ${id} deleted successfully.`;
        } else {
            return error("User not found.");
        }
    }
}

type UserInput record {
    string name;
    string email;
    string phone;
    string password;
    string address;
};

type LoginInput record {
    string email;
    string password;
};

type User record {
    string id;
    string name;
    string email;
    string phone;
    string password;
    string address;
};
