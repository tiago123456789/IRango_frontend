const configuracoes = {
    dev: {
        URL_API: "http://localhost:3000/"
    },
    prd: {
        URL_API: "http://localhost:8080/"
    }
};

export default configuracoes[process.env.NODE_ENV];