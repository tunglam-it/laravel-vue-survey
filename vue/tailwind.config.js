module.exports = {
  content: ["./src/**/*.{vue,ts,jsx,html,js}","./index.html"],
  theme: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/forms')
  ],
}
