exports.auth = (username, password, callback) => {
    console.warn("DEVELOPMENT - LOCAL - IDENTITY AUTHENTICATION");
    callback({
        success: true,
    });
}