import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  <span class='test'></span>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

const element = document.querySelector(".test");

function updateDom(value) {
  element.textContent = value;
}

function useEffect(fn, deps) {
  console.log(this);
  fn();
}

function targetWrapper(val) {
  this.val = val;
}

targetWrapper.prototype.valueOf = function () {
  return this.hello_world;
};
const obj = {
  hello_world: new targetWrapper("test")
};

const targetProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    return target[key];
  },
  set: function (target, key, value) {
    useEffect(() => {
      console.log("wow");
    }, [hello_world]);
    return true;
  }
});

targetProxy.hello_world = "hello";
let [hello_world, setState] = useState("tstl");
function useState(initialState) {
  hello_world = targetProxy.hello_world;
  targetWrapper.call(hello_world, initialState);
  return [
    targetProxy.hello_world,
    (val) => {
      // targetWrapper.call(hello_world, val);
      targetProxy.hello_world = targetWrapper.call(hello_world, val);
      updateDom(val);
      // targetProxy.hello_world = val;
    }
  ];
}

setState("wow2");
setState("woew");
console.log(obj.hello_world);
console.log(hello_world);
console.log(targetProxy.hello_world);
