webpackJsonp([2],{238:function(e,t,n){"use strict";function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),c=n.n(r),o=n(20),l=n(286),i=n(248),s=n(249),u=n(34),d=n(74),m=n(75),h=n(76),b=n(290),p=n(250),f=n(251),y=n(292),g=n(239),k=n(240),v=function(){function e(e,t){var n=[],a=!0,r=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(a=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,c=e}finally{try{!a&&l.return&&l.return()}finally{if(r)throw c}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),O=function(){return c.a.createElement(o.a,{w:200,pt:5,display:["none",null,null,null,"block"],fontSize:"12px"},c.a.createElement(d.a,{dense:!0,style:{position:"sticky",top:"64px"}},c.a.createElement(m.a,{button:!0},c.a.createElement(h.a,{secondary:"Contents"})),c.a.createElement(m.a,{button:!0},c.a.createElement(h.a,{secondary:"Radio Buttons"})),c.a.createElement(m.a,{button:!0},c.a.createElement(h.a,{secondary:"Checkboxes"})),c.a.createElement(m.a,{button:!0},c.a.createElement(h.a,{secondary:"Switches"})),c.a.createElement(m.a,{button:!0},c.a.createElement(h.a,{secondary:"API",disabled:!0}))))},E=function(){return c.a.createElement(r.Fragment,null,c.a.createElement(k.a,null,"Selection Controls"),c.a.createElement(k.c,null,"Selection controls allow the user to select options."),c.a.createElement(k.b,null,c.a.createElement("a",{href:"https://material.io/design/components/selection-controls.html"},"Selection Controls")," ","allow users to complete tasks that involve making choices such as selecting options, or switching settings on or off. Selection controls are found on screens that ask users to make decisions or declare preferences such as settings or dialogs.",c.a.createElement("br",null),c.a.createElement("br",null),"Three types of selection controls are covered in this section:",c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement("b",null,c.a.createElement("a",{href:"https://material-ui.com/demos/selection-controls/#radio-buttons"},"Radio Buttons")),"allow the selection of a single option from a set."),c.a.createElement("li",null,c.a.createElement("b",null,c.a.createElement("a",{href:"https://material-ui.com/demos/selection-controls/#checkboxes"},"Checkboxes")),"allow the selection of multiple options from a set."),c.a.createElement("li",null,c.a.createElement("b",null,c.a.createElement("a",{href:"https://material-ui.com/demos/selection-controls/#switches"},"Switches")),"allow a selection to be turned on or off."))))},j=function(){var e=Object(r.useState)("a"),t=v(e,2),n=t[0],a=t[1],o=Object(r.useCallback)(function(e){return a(e.target.value)},[]);return c.a.createElement(r.Fragment,null,c.a.createElement(k.c,null,"Standalone Radio Buttons"),c.a.createElement(k.b,null,"Radio Buttons can also be used standalone, without the wrapper."),c.a.createElement(g.a,null,c.a.createElement(u.a,{justifyContent:"flex-start",alignItems:"center",wrap:"wrap"},c.a.createElement(b.a,{checked:"a"===n,onChange:o,value:"a",name:"radio-button-demo","aria-label":"A",color:"secondary"}),c.a.createElement(b.a,{checked:"b"===n,onChange:o,value:"b",name:"radio-button-demo","aria-label":"B",color:"primary"}),c.a.createElement(b.a,{checked:"c"===n,onChange:o,value:"c",name:"radio-button-demo","aria-label":"C"}),c.a.createElement(b.a,{checked:"d"===n,onChange:o,value:"d",color:"default",name:"radio-button-demo","aria-label":"D"}),c.a.createElement(b.a,{checked:"e"===n,onChange:o,value:"e",color:"default",name:"radio-button-demo","aria-label":"E",icon:c.a.createElement(p.a,{fontSize:"20px"}),checkedIcon:c.a.createElement(f.a,{fontSize:"20px"})}))))},C=function(){var e=Object(r.useState)({a:!0,b:!0,f:!0}),t=v(e,2),n=t[0],o=n.a,d=n.b,m=n.f,h=t[1],b=Object(r.useCallback)(function(e,t){var n=a({},e.target.value,t);h(function(e){return Object.assign({},e,n)})},[]);return c.a.createElement(r.Fragment,null,c.a.createElement(k.c,null,"Checkboxes"),c.a.createElement(k.b,null,c.a.createElement("a",{href:"https://material.io/design/components/selection-controls.html#checkboxes"},"Checkboxes")," ","allow the user to select one or more items from a set. Checkboxes can be used to turn an option on or off.",c.a.createElement("br",null),c.a.createElement("br",null),"If you have multiple options appearing in a list, you can preserve space by using checkboxes instead of on/off switches. If you have a single option, avoid using a checkbox and use an on/off switch instead."),c.a.createElement(g.a,null,c.a.createElement(u.a,{justifyContent:"flex-start",alignItems:"center",wrap:"wrap"},c.a.createElement(l.a,{checked:o,onChange:b,value:"a"}),c.a.createElement(l.a,{checked:d,onChange:b,value:"b",color:"primary"}),c.a.createElement(l.a,{value:"c"}),c.a.createElement(l.a,{disabled:!0,value:"d"}),c.a.createElement(l.a,{disabled:!0,checked:!0,value:"e"}),c.a.createElement(l.a,{checked:m,onChange:b,value:"f",indeterminate:!0}),c.a.createElement(l.a,{defaultChecked:!0,color:"default",value:"g",icon:c.a.createElement(s.a,{fontSize:"20px"}),checkedIcon:c.a.createElement(i.a,{fontSize:"20px"})}))))},w=function(){var e=Object(r.useState)({a:!0,b:!0}),t=v(e,2),n=t[0],o=n.a,l=n.b,i=t[1],s=Object(r.useCallback)(function(e,t){var n=a({},e.target.value,t);i(function(e){return Object.assign({},e,n)})},[]);return c.a.createElement(r.Fragment,null,c.a.createElement(k.c,null,"Switches"),c.a.createElement(k.b,null,c.a.createElement("a",{href:"https://material.io/design/components/selection-controls.html#switches"},"Switches")," ","toggle the state of a single setting on or off. They are the preferred way to adjust settings on mobile.",c.a.createElement("br",null),c.a.createElement("br",null),"The option that the switch controls, as well as the state it\u2019s in, should be made clear from the corresponding inline label."),c.a.createElement(g.a,null,c.a.createElement(u.a,{justifyContent:"flex-start",alignItems:"center",wrap:"wrap"},c.a.createElement(y.a,{checked:o,onChange:s,value:"a"}),c.a.createElement(y.a,{checked:l,onChange:s,value:"b",color:"primary"}),c.a.createElement(y.a,{value:"c"}),c.a.createElement(y.a,{disabled:!0,value:"d"}),c.a.createElement(y.a,{disabled:!0,checked:!0,value:"e"}),c.a.createElement(y.a,{defaultChecked:!0,value:"f",color:"default"}))))};t.default=function(){return c.a.createElement(u.a,{w:1},c.a.createElement(o.a,{w:1,mt:5.5},c.a.createElement(E,null),c.a.createElement(j,null),c.a.createElement(C,null),c.a.createElement(w,null)),c.a.createElement(O,null))}},239:function(e,t,n){"use strict";function a(e){return c.a.createElement(o.a,e,e.children)}var r=n(0),c=n.n(r),o=n(34);a.defaultProps={position:"relative",mb:4,mx:32,p:[3,4],justifyContent:["flex-start",null,"center"],alignItems:"center",wrap:"wrap",bg:"grey.light",radius:"round"},t.a=a},240:function(e,t,n){"use strict";function a(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}n.d(t,"a",function(){return l}),n.d(t,"c",function(){return i}),n.d(t,"b",function(){return s});var r=n(0),c=n.n(r),o=n(35),l=function(e){var t=e.children,n=a(e,["children"]);return c.a.createElement(o.a,Object.assign({variant:"h2",mb:3,px:[3.5,4,5]},n),t)},i=function(e){var t=e.children,n=a(e,["children"]);return c.a.createElement(o.a,Object.assign({variant:"h5",mb:4,px:[3.5,4,5]},n),t)},s=function(e){var t=e.children,n=a(e,["children"]);return c.a.createElement(o.a,Object.assign({mb:4,px:[3.5,4,5]},n),t)}},247:function(e,t,n){"use strict";var a=n(288);n.d(t,"a",function(){return a.a})},248:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(72),o=function(e){return r.a.createElement(c.a,e,r.a.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}))};o.displayName="CheckBoxIcon",t.a=o},249:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(72),o=function(e){return r.a.createElement(c.a,e,r.a.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}))};o.displayName="CheckBoxOutlineBlankIcon",t.a=o},250:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(72),o=function(e){return r.a.createElement(c.a,e,r.a.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}))};o.displayName="RadioButtonUncheckedIcon",t.a=o},251:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(72),o=function(e){return r.a.createElement(c.a,e,r.a.createElement("path",{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}))};o.displayName="RadioButtonCheckedIcon",t.a=o},286:function(e,t,n){"use strict";var a=n(287);n.d(t,"a",function(){return a.a})},287:function(e,t,n){"use strict";function a(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}function r(e){var t=e.checked,n=e.color,a=e.disabled,r=void 0!==a&&a,c=e.theme.palette,o="primary"===n||"secondary"===n;switch(r?"disabled":t?"checked":null){case"disabled":return Object.assign({},Object(f.c)({color:"action.disabled"}),{pointerEvents:"none"});case"checked":return Object.assign({},Object(f.c)({color:o?n+".main":"text.secondary"}),{":hover":{backgroundColor:Object(g.b)(o?c[n].main:"light"===c.type?c.common.black:c.common.white,c.action.hoverOpacity)}});default:return Object(f.c)({color:"text.secondary"})}}function c(e){return{transition:(0,e.theme.getTransition)("background-color","shortest","in")}}var o=n(0),l=n.n(o),i=n(1),s=n.n(i),u=n(247),d=n(248),m=n(249),h=n(289),b=n(77),p=n(4),f=n(5),y=n(2),g=n(27),k=function(){function e(e,t){var n=[],a=!0,r=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(a=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,c=e}finally{try{!a&&l.return&&l.return()}finally{if(r)throw c}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),v=Object(p.a)(c,r);v.propTypes={checked:s.a.oneOfType([s.a.bool,s.a.string]),color:s.a.oneOf(["primary","secondary","default"])};var O=Object(o.forwardRef)(function(e,t){var n=Object(o.useState)(e.checked||!1),r=k(n,2),c=r[0],i=r[1],s=Object(f.m)(Object.assign({},e,{checked:c}),v,{whitelist:["checked"]}),d=k(s,2),m=d[0].styles,h=d[1],p=h.checkedIcon,g=h.icon,O=h.indeterminate,E=h.indeterminateIcon,j=h.inputProps,C=h.onChange,w=a(h,["checkedIcon","icon","indeterminate","indeterminateIcon","inputProps","onChange"]),x=Object(o.useCallback)(function(t,n){Object(y.i)(e.checked)&&i(function(){return n}),C&&C(t,n)},[]);return Object(b.a)(function(){return!Object(y.i)(e.checked)&&i(function(){return e.checked})},[e.checked,c]),l.a.createElement(u.a,Object.assign({checkedIcon:O?E:p,inputProps:Object.assign({"data-indeterminate":O},j),icon:O?E:g,onChange:x,ref:t,styles:{buttonStyles:m},type:"checkbox"},w))});O.displayName="Checkbox",O.propTypes={checked:s.a.oneOfType([s.a.bool,s.a.string]),checkedIcon:s.a.node,className:s.a.string,color:s.a.oneOf(["primary","secondary","default"]),disabled:s.a.bool,disableRipple:s.a.bool,icon:s.a.node,id:s.a.string,indeterminate:s.a.bool,indeterminateIcon:s.a.node,inputProps:s.a.object,inputRef:s.a.oneOfType([s.a.func,s.a.object]),onChange:s.a.func,styles:s.a.oneOfType([s.a.func,s.a.object]),type:s.a.string,value:s.a.string},O.defaultProps={checkedIcon:l.a.createElement(d.a,null),color:"secondary",icon:l.a.createElement(m.a,null),indeterminate:!1,indeterminateIcon:l.a.createElement(h.a,null)},t.a=O},288:function(e,t,n){"use strict";function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}var c,o=n(0),l=n.n(o),i=n(1),s=n.n(i),u=n(73),d=n(77),m=n(9),h=n(10),b=n(2),p=function(){function e(e,t){var n=[],a=!0,r=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(a=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,c=e}finally{try{!a&&l.return&&l.return()}finally{if(r)throw c}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),f={buttonStyles:{display:"inline-flex",alignItems:"center",transition:"none"},inputStyles:{zIndex:2,position:"absolute",top:"0px",left:"0px",width:"100%",height:"100%",margin:"0px",padding:"0px",cursor:"inherit",opacity:0}},y=Object(o.forwardRef)(function(e,t){var n=e.autoFocus,a=e.checked,c=e.checkedIcon,i=(e.className,e.disabled),s=e.icon,y=e.id,g=e.inputProps,k=(e.inputRef,e.name),v=e.onBlur,O=e.onChange,E=e.onFocus,j=e.readOnly,C=e.required,w=e.styles,x=e.tabIndex,I=e.type,S=e.value,T=r(e,["autoFocus","checked","checkedIcon","className","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","styles","tabIndex","type","value"]),P=Object(o.useState)(a||!1),R=p(P,2),N=R[0],z=R[1],B=Object(o.useMemo)(function(){return Object(m.a)(f,Object(b.g)(w)?w(e):w)},[e]),A=B.buttonStyles,F=B.inputStyles,M=Object(o.useMemo)(function(){return Object(h.a)(F)},[F]),U="checkbox"===I||"radio"===I,q=Object(o.useCallback)(function(e){Object(b.i)(a)&&z(e.target.checked),O&&O(e,e.target.checked)},[]),H=Object(o.useCallback)(function(e){return E&&E(e)},[]),V=Object(o.useCallback)(function(e){return v&&v(e)},[]);return Object(d.a)(function(){return!Object(b.i)(a)&&z(function(){return a})},[a]),l.a.createElement(u.a,Object.assign({component:"span",styles:{root:A},disabled:i,tabIndex:null,role:void 0,onFocus:H,onBlur:V},T),N?c||s:s,l.a.createElement("input",Object.assign({autoFocus:n,checked:N,className:M,disabled:i,id:U&&y,name:k,onChange:q,readOnly:j,ref:t,required:C,tabIndex:x,type:I,value:S},g)))});y.displayName="SelectionControl",y.propTypes=(c={autoFocus:s.a.bool,checked:s.a.bool,checkedIcon:s.a.node,className:s.a.string,defaultChecked:s.a.bool,disabled:s.a.bool,disableRipple:s.a.bool,icon:s.a.node.isRequired,id:s.a.string,inputProps:s.a.object,indeterminate:s.a.bool,indeterminateIcon:s.a.node},a(c,"inputProps",s.a.object),a(c,"inputRef",s.a.oneOfType([s.a.func,s.a.object])),a(c,"name",s.a.string),a(c,"onBlur",s.a.func),a(c,"onChange",s.a.func),a(c,"onFocus",s.a.func),a(c,"readOnly",s.a.bool),a(c,"required",s.a.bool),a(c,"styles",s.a.oneOfType([s.a.func,s.a.object])),a(c,"tabIndex",s.a.oneOfType([s.a.number,s.a.string])),a(c,"type",s.a.string.isRequired),a(c,"value",s.a.string),c),t.a=y},289:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(72),o=function(e){return r.a.createElement(c.a,e,r.a.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}))};o.displayName="IndeterminateCheckBoxIcon",t.a=o},290:function(e,t,n){"use strict";var a=n(291);n.d(t,"a",function(){return a.a})},291:function(e,t,n){"use strict";function a(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}function r(e){var t=e.checked,n=e.color,a=e.disabled,r=void 0!==a&&a,c=e.theme.palette,o="primary"===n||"secondary"===n;switch(r?"disabled":t?"checked":null){case"disabled":return Object.assign({},Object(p.c)({color:"action.disabled"}),{pointerEvents:"none"});case"checked":return Object.assign({},Object(p.c)({color:o?n+".main":"text.secondary"}),{":hover":{backgroundColor:Object(y.b)(o?c[n].main:"light"===c.type?c.common.black:c.common.white,c.action.hoverOpacity)}});default:return Object(p.c)({color:"text.secondary"})}}function c(e){return{transition:(0,e.theme.getTransition)("background-color","shortest","in")}}var o=n(0),l=n.n(o),i=n(1),s=n.n(i),u=n(247),d=n(250),m=n(251),h=n(77),b=n(4),p=n(5),f=n(2),y=n(27),g=function(){function e(e,t){var n=[],a=!0,r=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(a=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,c=e}finally{try{!a&&l.return&&l.return()}finally{if(r)throw c}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),k=Object(b.a)(c,r);k.propTypes={checked:s.a.oneOfType([s.a.bool,s.a.string]),color:s.a.oneOf(["primary","secondary","default"])};var v=Object(o.forwardRef)(function(e,t){var n=Object(o.useState)(e.checked||!1),r=g(n,2),c=r[0],i=r[1],s=Object(p.m)(Object.assign({},e,{checked:c}),k,{whitelist:["checked"]}),d=g(s,2),m=d[0].styles,b=d[1],y=b.checkedIcon,v=b.icon,O=b.indeterminate,E=b.inputProps,j=b.onChange,C=a(b,["checkedIcon","icon","indeterminate","inputProps","onChange"]),w=Object(o.useCallback)(function(t,n){Object(f.i)(e.checked)&&i(function(){return n}),j&&j(t,n)},[]);return Object(h.a)(function(){return!Object(f.i)(e.checked)&&i(function(){return e.checked})},[e.checked,c]),l.a.createElement(u.a,Object.assign({checkedIcon:y,icon:v,inputProps:Object.assign({"data-indeterminate":O},E),onChange:w,ref:t,styles:{buttonStyles:m},type:"radio"},C))});v.displayName="Radio",v.propTypes={checked:s.a.oneOfType([s.a.bool,s.a.string]),checkedIcon:s.a.node,disabled:s.a.bool,disableRipple:s.a.bool,icon:s.a.node,id:s.a.string,inputProps:s.a.object,inputRef:s.a.oneOfType([s.a.func,s.a.object]),onChange:s.a.func,styles:s.a.oneOfType([s.a.func,s.a.object]),type:s.a.string,value:s.a.oneOfType([s.a.string,s.a.number,s.a.bool])},v.defaultProps={checkedIcon:l.a.createElement(m.a,null),color:"secondary",icon:l.a.createElement(d.a,null)},t.a=v},292:function(e,t,n){"use strict";var a=n(293);n.d(t,"a",function(){return a.a})},293:function(e,t,n){"use strict";function a(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}function r(e){return e.disabled?{bar:{backgroundColor:"light"===e.theme.palette.type?e.theme.palette.common.black:e.theme.palette.common.white,opacity:"light"===e.theme.palette.type?.12:.1},button:{pointerEvents:"none"},iconChecked:{color:"light"===e.theme.palette.type?e.theme.palette.grey.main:e.theme.palette.grey.dark},iconUnchecked:{color:"light"===e.theme.palette.type?e.theme.palette.grey.main:e.theme.palette.grey.dark}}:null}function c(e){if(e.checked){var t="primary"===e.color||"secondary"===e.color?e.theme.palette[e.color].main:"light"===e.theme.palette.type?e.theme.palette.common.black:e.theme.palette.common.white;return{bar:{backgroundColor:t,opacity:.5},button:{color:t,":hover":{backgroundColor:Object(y.b)(t,e.theme.palette.action.hoverOpacity)}}}}return null}function o(e){var t="light"===e.theme.palette.type?e.theme.palette.common.black:e.theme.palette.common.white;return{root:{position:"relative",display:"inline-flex",width:"62px",flexShrink:0,verticalAlign:"middle"},bar:{position:"absolute",top:"50%",left:"50%",width:"34px",height:"14px",marginTop:"-7px",marginLeft:"-17px",display:"block",backgroundColor:t,borderRadius:"7px",opacity:"light"===e.theme.palette.type?.38:.3},button:{zIndex:1,color:"currentColor",padding:"0px",height:"48px",width:"48px",transition:e.theme.getTransition("background-color","shortest","in"),":hover":{backgroundColor:Object(y.b)(t,e.theme.palette.action.hoverOpacity)}},icon:{width:"20px",height:"20px",backgroundColor:"currentColor",borderRadius:"50%"},iconUnchecked:{color:e.theme.palette.common.white,boxShadow:e.theme.elevation[1]},iconChecked:{color:"primary"===e.color||"secondary"===e.color?e.theme.palette[e.color].main:"light"===e.theme.palette.type?e.theme.palette.common.white:e.theme.palette.grey.main,boxShadow:e.theme.elevation[2]},selectControlUnchecked:{transform:"translate3d(0px, 0px, 0px)"},selectControlChecked:{transform:"translate3d(14px, 0px, 0px)"}}}var l=n(0),i=n.n(l),s=n(1),u=n.n(s),d=n(247),m=n(77),h=n(16),b=n(4),p=n(21),f=n(2),y=n(27),g=n(3),k=function(){function e(e,t){var n=[],a=!0,r=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(a=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,c=e}finally{try{!a&&l.return&&l.return()}finally{if(r)throw c}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),v=Object(b.a)(o,c,r);v.propTypes={color:u.a.oneOf(["primary","secondary","default"])};var O=Object(l.forwardRef)(function(e,t){var n=Object(l.useState)(e.checked||!1),r=k(n,2),c=r[0],o=r[1],s=Object(h.a)(Object.assign({},e,{checked:c}),v),u=k(s,2),b=u[0],y=b.styles,g=b.classes,O=u[1],E=(O.className,O.icon,O.onChange),j=a(O,["className","icon","onChange"]),C=Object(p.b)(Object.assign({},c?y.iconChecked:y.iconUnchecked,{from:c?y.iconUnchecked:y.iconChecked,config:{tension:1200,friction:40}})),w=Object(p.b)(Object.assign({},c?y.selectControlChecked:y.selectControlUnchecked,{from:c?y.selectControlUnchecked:y.selectControlChecked,config:{tension:1200,friction:40}})),x=Object(l.useCallback)(function(t){Object(f.i)(e.checked)&&o(t.target.checked),E&&E(t,t.target.checked)},[]);return Object(m.a)(function(){return!Object(f.i)(e.checked)&&o(e.checked)},[e.checked]),i.a.createElement("span",{className:g.root},i.a.createElement("span",{className:g.bar}),i.a.createElement(p.a.div,{className:g.selectControl,style:w},i.a.createElement(d.a,Object.assign({onChange:x,ref:t,type:"checkbox",icon:i.a.createElement(p.a.div,{className:g.icon,style:C}),styles:{buttonStyles:y.button}},j))))});O.displayName="Switch",O.propTypes=Object.assign({checked:u.a.oneOfType([u.a.bool,u.a.string]),checkedIcon:u.a.node,className:u.a.string,defaultChecked:u.a.bool,disabled:u.a.bool,disableRipple:u.a.bool,id:u.a.string,inputProps:u.a.object,inputRef:u.a.oneOfType([u.a.func,u.a.object]),onChange:u.a.func},g.g,{type:u.a.string,value:u.a.string},v.propTypes),O.defaultProps={color:"secondary"},t.a=O}});
//# sourceMappingURL=2.b5569bc7.chunk.js.map