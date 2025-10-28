const executeJs = {

    execCode: async function execCode(codeSnippet) {
        const response = await fetch("https://execjs.emilfolino.se/code", {
            body: JSON.stringify({code: btoa(codeSnippet)}),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
    });
        const result = await response.json();
        const decodedOutput = atob(result.data)
        console.log(decodedOutput)
        return decodedOutput
    }
};

export default executeJs;
