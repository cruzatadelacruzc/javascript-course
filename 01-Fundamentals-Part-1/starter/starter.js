let js = "awesome";
if (js == "amazing") console.log("OMG, we got it!!");
else
  console.log(
    "Uf, we do not got it, because real value is: " + js.toUpperCase()
  );
let $foo = true;
console.log(typeof $foo);
console.log($foo);
$foo = 45;
console.log(typeof $foo);
console.log($foo + 11);
$foo = "value Cesar";
console.log(typeof $foo);
console.log($foo);
$foo = {};
if ($foo instanceof Object)
  $foo = {
    name: "Cesar",
    firstLastName: "Cruzata",
    second: "De la Cruza",
    nickName: "Algadafi",
  };
console.log($foo);

const ageUser = prompt("What's is your birthyear", 1990);

if (Number(ageUser)) console.log(2021 - ageUser);
else alert("Uf, You provided a malformated birthYear");

switch (ageUser) {
  case "1991":
  case "1992": {
    console.log("Here, you are The Men!:D");
    break;
  }
  default:
    console.log("Uf, you are looser?");
}
