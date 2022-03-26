const getFlights = async(event: any) => {
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: `Hello, CDK! You've hit ${event.path}\n`
    };
};

module.exports = {getFlights};