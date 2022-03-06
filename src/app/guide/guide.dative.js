import Dative from "dativejs";
import template from "./guide.md";

export let Guide = Dative.extend({
  data: () => ({
    msg: "hi",
  }),
  template: `<div class="bg-base-200">
    <div id="nav"></div>
        <div class="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto min-h-screen prose-blue mt-5">
            ${template}
        </div>
        <div id="footer"></div>
    </div>`,
});
