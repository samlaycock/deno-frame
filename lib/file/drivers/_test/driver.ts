import { mock } from "../../dev_deps.ts";

const readFile = mock.spy();
const writeFile = mock.spy();
const deleteFile = mock.spy();

export default {
  name: "test",
  readFile,
  writeFile,
  deleteFile,
  reset() {
    this.readFile = mock.spy();
    this.writeFile = mock.spy();
    this.deleteFile = mock.spy();
  },
};
