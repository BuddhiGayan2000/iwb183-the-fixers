// providers service foe handling provider registration and login.
// The service is secured with JWT authentication.
// Resources are:
//     - register: Provider registration
//     - login: Provider login
//     - get: Get provider by ID
//     - put: Update provider by ID
//     - delete: Delete provider by ID


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

service /providers on new http:Listener(9093) {
    private final mongodb:Database db;

    function init() returns error? {
        self.db = check mongoDb->getDatabase("DizposeDB");
    }

    // Provider registration
    resource function post register(ProviderInput input) returns string|error {

        mongodb:Collection providersCollection = check self.db->getCollection("ServiceProviders");
        string providerId = uuid:createType1AsString();

        string dataString = input.password;
        byte[] data = dataString.toBytes();
        byte[] hashedData = crypto:hashSha256(data);
        string hashedPassword = hashedData.toBase64();

        Provider provider = {
            id: providerId,
            name: input.name,
            email: input.email,
            password: hashedPassword,
            phone: input.phone,
            address: input.address,
            servicesOffered: input.servicesOffered,
            location: input.location
        };

        check providersCollection->insertOne(provider);
        return string `Provider ${input.name} registered successfully`;
    }

    // Provider login
    resource function post login(LoginInput input) returns json|error {
        mongodb:Collection providersCollection = check self.db->getCollection("ServiceProviders");

        stream<Provider, error?> resultStream = check providersCollection->find({
            email: input.email
        });
        record {Provider value;}|error? result = resultStream.next();

        if result is error? {
            return error(string `Invalid credentials: User with email ${input.email} not found.`);
        }

        Provider provider = result.value;

        string inputPasswordHashed = crypto:hashSha256(input.password.toBytes()).toBase64();

        if provider.password != inputPasswordHashed {
            return error("Invalid credentials: Incorrect password");
        }

        jwt:IssuerConfig issuerConfig = {
            username: provider.id,
            issuer: "buddhi",
            audience: "provider",
            expTime: 2592000,
            signatureConfig: {
                config: {
                    keyFile: privateKeyFile
                }
            }
        };

        string jwtToken = check jwt:issue(issuerConfig);

        return {message: "Login successful", jwt: jwtToken, user: {id: provider.id, name: provider.name, email: provider.email, phone: provider.phone, address: provider.address, servicesOffered: provider.servicesOffered, location: provider.location}};
    }

    @http:ResourceConfig {
        auth: [
            {
                jwtValidatorConfig: {
                    issuer: "buddhi",
                    audience: "provider",
                    signatureConfig: {
                        certFile: "resources/public.crt"
                    }
                }
            }
        ]
    }

    //get provider by id
    resource function get [string id](http:Caller caller, http:Request req) returns error? {
        mongodb:Collection usersCollection = check self.db->getCollection("ServiceProviders");

        map<json> filter = {
            "id": id
        };

        var result = usersCollection->findOne(filter, {}, {}, Provider);

        if result is Provider {
            check caller->respond(result);
        } else if result is mongodb:DatabaseError {
            return error("Database error: " + result.message());
        } else if result is mongodb:ApplicationError {
            return error("Application error: " + result.message());
        } else {
            return error("User not found");
        }
    }

    @http:ResourceConfig {
        auth: [
            {
                jwtValidatorConfig: {
                    issuer: "buddhi",
                    audience: "provider",
                    signatureConfig: {
                        certFile: "resources/public.crt"
                    }
                }
            }
        ]
    }

    resource function put [string id](ProviderInput input) returns string|error {
        mongodb:Collection usersCollection = check self.db->getCollection("ServiceProviders");

        map<anydata> updateFields = {};

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

        if input.servicesOffered.length() > 0 {
            updateFields["servicesOffered"] = input.servicesOffered;
        }

        if input.location.length() > 0 {
            updateFields["location"] = input.location;
        }

        if updateFields.length() == 0 {
            return error("No fields provided for update.");
        }

        map<json> jsonFields = {};
        foreach var [key, value] in updateFields.entries() {
            jsonFields[key] = <json>value;
        }

        var updateResult = check usersCollection->updateOne(
        {"id": id},
        {"set": jsonFields}
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
                    audience: "provider",
                    signatureConfig: {
                        certFile: "resources/public.crt"
                    }
                }
            }
        ]
    }

    resource function delete [string id]() returns string|error {
        mongodb:Collection usersCollection = check self.db->getCollection("ServiceProviders");

        var deleteResult = check usersCollection->deleteOne({"id": id});

        if deleteResult.deletedCount > 0 {
            return string `User ${id} deleted successfully.`;
        } else {
            return error("User not found.");
        }      
    }

}

type ProviderInput record {
    string name;
    string email;
    string password;
    string phone;
    string address;
    string[] servicesOffered;
    decimal[] location;
};

type LoginInput record {
    string email;
    string password;
};

type Provider record {
    string id?;
    string name?;
    string email?;
    string password?;
    string phone?;
    string address?;
    string[] servicesOffered?;
    decimal[] location?;
};
