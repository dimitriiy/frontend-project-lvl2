import gendiff from '../gendiff'
import  path from "path";
import  fs from "fs";

const getFixturePath = (filename) => path.join(__dirname,"..","__fixtures__",filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe("gendiff",() => {

    it("successfull",() => {
        const file1 = readFile("file1.json");
        const file2 = readFile("file2.json");

        expect(gendiff(file1,file2)).toEqual(`{
 + follow: false
   host: hexlet.io
 + proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 - verbose: true
}`)
    })
})


