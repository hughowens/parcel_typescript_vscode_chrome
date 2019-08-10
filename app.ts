import m from "mithril"


let value = 42;

let act = (action:string)=>{
  switch(action){
    case "inc": 
      value = value + 1;
      break;
    case "dec": 
      value = value - 1;
      break;
  }
}


let Hello = {
  view: function() {
      return m("main", [
          m("h1", {class: "title"}, `${value}`),
          m("button", {onclick:()=>{
            act("inc");
          }},"Increment"),
          m("button", {onclick:()=>{
            act("dec");
          }},"Decrement"),
      ])
  }
}

window.onload = function () {
  console.log("widow loaded");
  m.mount(document.body, Hello)
}