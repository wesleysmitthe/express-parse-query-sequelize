import fs from "fs-extra";
import chieldProcess from "child_process"


(async () => {
    try {
        fs.removeSync("./dist/");

        await exec("npx tsc --build tsconfig.json", { cwd: "./" }) // build project 
        // await exec("npx tsc -p tsconfig.types.json", { cwd: "./" }) // generate types 

        const typesFilename = "queryParserMiddlewareTypes.d.ts";

        fs.copySync(`./src/${typesFilename}`, `./dist/types/${typesFilename}`)

    } catch (err) {
        console.error(err);
    }
})()



function exec(cmd: string, options: chieldProcess.ExecOptions): Promise<void> {
    return new Promise((resolve, reject) => {
        chieldProcess.exec(cmd, options, (err, stdout, stderr) => {
            if (!!stdout) {
                console.log(stdout);
            }

            if (!!stderr) {
                console.error(stderr);
            }

            return err ? reject(err) : resolve();
        });
    });
}