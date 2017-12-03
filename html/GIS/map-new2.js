window.onload = function (){
  let PARAMS = {w:800, h:800};
  let param = location.href.split("?");
  if(param.length>1) {
    param[1].split("&").forEach(function(p) {
      v = p.split("=");
      if(v.length>1 && PARAMS[v[0]] !==undefined) PARAMS[v[0]] = v[1];
    });
  }
  let Clrs = [[255,0,0],[0,255,0],[0,0,255],[127,127,0],[127,0,127],[0,127,127]];
  let Colors = Clrs.map(function(C){ return `rgb(${C.join(",")})`;});
  let C2 = Clrs.map(function(C) {
    return "rgb("+ C.map(function(C1){
        return Math.floor((C1+255*2)/3,1)}).join(",")+")"});
  let GMap = google.maps;
  let canvas = document.getElementById("map_canvas");
  canvas.setAttribute("style","width:"+PARAMS.w+"px; height:"+PARAMS.h+"px;");
  let map = new GMap.Map(canvas,
    {//center:new GMap.LatLng(35.486210,139.341443),
     mapTypeId: GMap.MapTypeId.ROADMAP,
     scaleControl:true,
     scaleControlOptions:GMap.ControlPosition.BOTTOM_LEFT,
     zoom:10
    });
  let Routes;
  let table = document.getElementById("info");
  document.getElementById("file").onchange =function(E) {
    let R = 6378137;
    let reader = new FileReader();
    reader.onload = function(){
      let log = new window.DOMParser().parseFromString(reader.result,"text/xml");
      let trks = log.getElementsByTagName("trk");
      Routes = Array.prototype.map.call(trks,function(trk){
        let trksegs = trk.getElementsByTagName("trkpt");
          return {route:Array.prototype.map.call(trksegs,function(P) {
          let lat = P.getAttribute("lat");
          let lon = P.getAttribute("lon");
          let latRad = lat * Math.PI/180;
          let lonRad = lon * Math.PI/180;
          let latCos = Math.cos(latRad);
          return [
            lat, lon, 
            new Date(P.getElementsByTagName("time")[0].firstChild.nodeValue).getTime(),
            R*latCos*Math.cos(lonRad),
            R*latCos*Math.sin(lonRad),
            R*Math.sin(latRad)];
          })};
      });
      ShowPath(8, 0.5, 0);
    }
    reader.onerror= function(){alert("Error")};
    reader.readAsText(E.target.files[0]);
  };
  function makeTR(data, tbl, color){
    let tr = document.createElement("tr");
    tbl.appendChild(tr);
    if(color>=0) tr.style.background = C2[color%C2.length];
    data.forEach(function(val) {
      let td = document.createElement("td");
      tr.appendChild(td);
      td.appendChild(document.createTextNode(val));
    });
  }
  function ShowPath(w, o, s) {
    let tbl = document.createElement("table");
    table.appendChild(tbl);
    let latMin=180, latMax=-180, lonMin=180, lonMax=-180;
    makeTR(["番号","日付","開始時間","終了時間","地点数"], tbl, -1);
      Routes.forEach(function(Ps, i) {
      let points = Ps.route.map(function(P){
          latMax = Math.max(latMax, P[0]);
          latMin = Math.min(latMin, P[0]);
          lonMax = Math.max(lonMax, P[1]);
          lonMin = Math.min(lonMin, P[1]);
          return new GMap.LatLng(Ps[0],Ps[1]);
      });          
      let d1 = new Date(Ps.route[0][2]);
      let d2 = new Date(Ps.route[Ps.route.length-1][2]);
      makeTR([i+1,
        d1.toLocaleDateString(), d1.toLocaleTimeString(), d2.toLocaleTimeString(),
        points.length], tbl, i);
      new GMap.Polyline({
        path: Ps.route.map(function(P){return new GMap.LatLng(P[0],P[1]);}),
        strokeColor: Colors[(i+s)%Colors.length],
        strokeWeight:w,
        strokeOpacity:o,
        map: map});
      }
    );
    let latLngB = new GMap.LatLngBounds(new GMap.LatLng(latMax, lonMax));
    latLngB.extend(new GMap.LatLng(latMin, lonMin));
    map.fitBounds(latLngB);
  }
}
