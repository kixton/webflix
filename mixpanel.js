// function passing thru 'f' and 'b' as arguments
(function(f,b){
  // if b.__SV does not exist...
  if(!b.__SV){
    // initialize variables a,e,i,g
    var a,e,i,g;
    // set window.mixpanel to the 'b' argument passed thru
    window.mixpanel=b;
    
    // store empty array in 'b' object
    b._i=[];

    // define the .init function stored in 'b' object
    // .init takes in 3 arguments: 'a', 'e', 'd'
    b.init=function(a,e,d){

      // another function passing thru arguments 'b' and 'h'
      function f(b,h){
        // 'h' is split into an array based on "." and assigned to var a
        var a=h.split(".");

        // if length of array 'a' is 2
        2==a.length && (b=b[a[0]],h=a[1]);
        b[h]=function(){
          b.push([h].concat(Array.prototype.slice.call(arguments,0)));
        };
      }

      var c=b;

      "undefined"!==typeof
      d?c=b[d]=[]:d="mixpanel";
      c.people=c.people||[];
      c.toString=function(b){
        var a="mixpanel";
        "mixpanel"!==d && (a+="."+d);
        b||(a+=" (stub)");
        return a;
      };
      c.people.toString=function(){
        return c.toString(1)+".people (stub)"};
        i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
    for(g=0;g<i.length;g++)
      f(c,i[g]);
      b._i.push([a,e,d]);
    };
      b.__SV=1.2;
      a=f.createElement("script");
      a.type="text/javascript";
      a.async=!0;
      a.src="//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
      e=f.getElementsByTagName("script")[0];
      e.parentNode.insertBefore(a,e);
  }
})
  (document,window.mixpanel||[]);
  mixpanel.init("bdeffd2254f037dbe039c0662e94d51c");



var b = window.mixpanel || [];
if (!b.__SV) {
  var i, g;
  window.mixpanel = b;
  b._i = [];
  b.init = function (a, e, d) {
    function f(b, h) {
      var a = h.split(".");
      2 == a.length && (b = b[a[0]], h = a[1]);
      b[h] = function () {
          b.push([h].concat(Array.prototype.slice.call(arguments, 0)))
      };
    }
    var c = b;
    "undefined" !==
    typeof d ? c = b[d] = [] : d = "mixpanel";
    c.people = c.people || [];
    c.toString = function (b) {
        var a = "mixpanel";
        "mixpanel" !== d && (a += "." + d);
        b || (a += " (stub)");
        return a;
    };
    c.people.toString = function () {
        return c.toString(1) + ".people (stub)";
    };
    i = "disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
    for (g = 0; g < i.length; g++)
        f(c, i[g]);
    b._i.push([a, e, d]);
  };
  b.__SV = 1.2;
}
b.init("bdeffd2254f037dbe039c0662e94d51c");
