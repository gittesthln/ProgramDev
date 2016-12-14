var PARAMS = {w:800, h:800};
window.onload = function (){
  var param = location.href.split("?");
  if(param.length>1) {
    param = param[1].split("&");
    param.forEach(function(v) {
      vv = v.split("=");
      if(vv.length>1) PARAMS[vv[0]] = vv[1];
    });
  }
  var Clrs = [[255,0,0],[63,63,63],[0,255,0],
        [0,0,255],[127,127,0],[127,0,127],[0,127,127]];
  var Colors = Clrs.map(function(C) { return "rgb("+C.join(",")+")";});
  var C2 = Clrs.map(function(C) {
    return "rgb("+ C.map(function(C1){
        return Math.floor((C1+255*2)/3,1)}).join(",")+")";});
  var GMap = google.maps;
  var canvas = document.getElementById("map_canvas");
  canvas.setAttribute("style","width:"+PARAMS.w+"px; height:"+PARAMS.h+"px;");
  var map = new GMap.Map(canvas,
    {center:new GMap.LatLng(35.486210,139.341443),
     mapTypeId: GMap.MapTypeId.ROADMAP,
     scaleControl:true,
     scaleControlOptions:GMap.ControlPosition.BOTTOM_LEFT,
     zoom:10
    });
  var Points=[];
  var table = document.getElementById("info");
  document.getElementById("file").onchange =function(E) {
    var R = 6378137;
    var reader = new FileReader();
    reader.onload = function(){
      var log = new window.DOMParser().parseFromString(reader.result,"text/xml");
      var trks = log.getElementsByTagName("trk");
      Array.prototype.forEach.call(trks,function(trk,i){
        var trksegs = trk.getElementsByTagName("trkpt");
        Points[i] = Array.prototype.map.call(trksegs,function(V) {
          var lat = V.getAttribute("lat");
          var lon = V.getAttribute("lon");
          var latRad = lat * Math.PI/180;
          var lonRad = lon * Math.PI/180;
          var latCos = Math.cos(latRad);
          return [lat, lon, 
            new Date(V.getElementsByTagName("time")[0].firstChild.nodeValue).getTime()].concat(
              [R*latCos*Math.cos(lonRad),R*latCos*Math.sin(lonRad),R*Math.sin(latRad)]);
        });
        console.log(i);
      });
      ShowPath(8, 0.5, 0);
    }
    reader.onerror= function(){alert("Error")};
    reader.readAsText(E.target.files[0]);
  };
  function makeTR(data, tbl, color){
    var tr = document.createElement("tr");
    tbl.appendChild(tr);
    if(color>=0) tr.style.background = C2[color%C2.length];
    data.forEach(function(val) {
      var td = document.createElement("td");
      tr.appendChild(td);
      td.appendChild(document.createTextNode(val));
    });
  }
  function ShowPath(w, o, s) {
    var tbl = document.createElement("table");
    table.appendChild(tbl);
    var latMin=180, latMax=-180, lonMin=180, lonMax=-180;
    makeTR(["番号","日付","開始時間","終了時間","地点数"], tbl, -1);
    Points.forEach(function(Ps, i) {
      var Routes = Ps.map(function(P){
          latMax = Math.max(latMax, P[0]);
          latMin = Math.min(latMin, P[0]);
          lonMax = Math.max(lonMax, P[1]);
          lonMin = Math.min(lonMin, P[1]);
          return new GMap.LatLng(P[0],P[1]);
        });
      var d1 = new Date(Ps[0][2]);
      var d2 = new Date(Ps[Ps.length-1][2]);
      makeTR([i+1,
          d1.toLocaleDateString(),
          d1.toLocaleTimeString(),
          d2.toLocaleTimeString(),
          Routes.length], tbl, i);
      new GMap.Polyline({
        path: Ps.map(function(P){return new GMap.LatLng(P[0],P[1]);}),
        strokeColor: Colors[(i+s)%Colors.length],
        strokeWeight:w,
        strokeOpacity:o,
        map: map});
      }
    );
    var latLngB = new GMap.LatLngBounds(new GMap.LatLng(latMax, lonMax));
    latLngB.extend(new GMap.LatLng(latMin, lonMin));
    map.fitBounds(latLngB);
  }
}
