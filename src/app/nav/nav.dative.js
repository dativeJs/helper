import Dative from "dativejs";
import template from "./nav.dative.html";

export let Nav = Dative.extend({
  template,
  data: () => ({
    open: false,
    filteredNames: [],
    api: [
      {
        name: "introduction",
        link: "index.html#introduction",
      },
      {
        name: "installation",
        link: "index.html#installation",
      },
      {
        name: "usage",
        link: "index.html#usage",
      },
      {
        name: "truncate",
        link: "index.html#truncate",
      },
      {
        name: "range",
        link: "index.html#range",
      },
      {
        name: "screen",
        link: "index.html#screen",
      },
      {
        name: "timeout",
        link: "index.html#timeout",
      },
      {
        name: "interval",
        link: "index.html#interval",
      },
    ],
  }),
  onmounted() {
    addEventListener("keyup", (e) => {
      if (e.key === "/" && (e.ctrlKey || e.metaKey)) {
        this.open = true;
        this.$ref.search.focus();
      }
    });
  },
  methods: {
    search(e) {
      this.filteredNames = this.open
        ? e.target.value
          ? this.api.filter((d) =>
              d.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
          : []
        : [];
    },
  },
});
