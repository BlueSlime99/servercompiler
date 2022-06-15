const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());


app.post("/compile", (req, res) => {
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;


    if (language === "python") {
        language="py"
    }

    let data = ({
        "code": code,
        "language": language,
        "input": input

    });
    //@cors(origin)
    let config = {
        method: 'post',
        url: 'https://codex-api.herokuapp.com/',
        headers: {
            "Content-Type": 'application/json',
        },
        data: data
    };
    //appel au code de compile API du coup
    Axios(config)
        .then((response)=>{
            res.send(response.data)
            console.log(response.data)
        }).catch((error)=>{
        console.log(error);
    });
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
