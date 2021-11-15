import { mock } from "../../dev_deps.ts";

const log = mock.spy();

export default {
  name: "test",
  log,
  reset() {
    this.log = mock.spy();
  },
};
