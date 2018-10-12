function MKHTMLElm(P, Elm, Attribs, Events) {
  let HTMLNS = "http://www.w3.org/1999/xhtml";
  return MakeElement(HTMLNS, P, Elm, Attribs, Events)
}
function MKSVGElm(P, Elm, Attribs, Events) {
  let SVGNS = "http://www.w3.org/2000/svg";
  return MakeElement(SVGNS, P, Elm, Attribs, Events)
}
function MakeElement(NS, P, elem, attribs, events) {
  let Element = document.createElementNS(NS,elem);
  SetAttributes(Element, attribs);
  AddEvents(Element, events);
  if(P) P.appendChild(Element);
  return Element;
} 
function SetAttributes(Elm, attribs) {
  for( attrib in attribs) {
      Elm.setAttribute(attrib,attribs[attrib]);
  }
}
function AddEvents(Elm, Events) {
  for( event in Events) {
      Elm.addEventListener(event,Events[event][0], Events[event][1]);
  }
}
function RemoveEvents(Elm, Events) {
  for( event in Events) {
      Elm.removeEventListener(event,Events[event][0], Events[event][1]);
  }
}
