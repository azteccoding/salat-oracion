# Dibuja docs/zonas-horarios.svg: mapamundi con las zonas donde lib/horarios-rezo.js
# deja tiempos sin hora. Uso: python scripts/mapa-zonas-horarios.py
# 51.55°: el sol no baja a 15° algunos días de verano (faltan faŷr e ʿišāʾ).
# 65.73°: hay días sin salida o sin puesta del sol.
import json, os, urllib.request
URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json"
out = os.path.join(os.path.dirname(__file__), "..", "docs", "zonas-horarios.svg")
t = json.load(urllib.request.urlopen(URL))
sx,sy=t['transform']['scale'];tx,ty=t['transform']['translate']
arcs=[]
for a in t['arcs']:
    x=y=0;pts=[]
    for dx,dy in a:
        x+=dx;y+=dy;pts.append((x*sx+tx,y*sy+ty))
    arcs.append(pts)
W,H=1000,500
P=lambda lon,lat:(round((lon+180)/360*W,1),round((90-lat)/180*H,1))
def ring(r):
    pts=[]
    for i in r:
        a=arcs[i] if i>=0 else arcs[~i][::-1]
        pts+= a if not pts else a[1:]
    return pts
d=[]
geoms=t['objects']['land']['geometries']
for g in geoms:
    polys=g['arcs'] if g['type']=='MultiPolygon' else [g['arcs']]
    for poly in polys:
        for r in poly:
            pts=[P(*p) for p in ring(r)]
            # Anillos que cruzan el antimeridiano: se desenrollan y se dibujan
            # también desplazados un ancho de mapa (el viewBox recorta lo demás).
            un=[pts[0]];off=0
            for (x0,_),(x1,y1) in zip(pts,pts[1:]):
                if x1-x0>W/2: off-=W
                elif x0-x1>W/2: off+=W
                un.append((round(x1+off,1),y1))
            copias=[0]
            if off==0:
                if min(x for x,_ in un)<0: copias.append(W)
                if max(x for x,_ in un)>W: copias.append(-W)
            else:
                un=pts  # Antártida: rodea el polo, se deja igual
            for c in copias:
                d.append("M"+" L".join(f"{round(x+c,1)},{y}" for x,y in un)+"Z")
A,B=51.55,65.73
y=lambda lat:P(0,lat)[1]
band=lambda la,lb,op:f'<rect x="0" y="{y(lb)}" width="{W}" height="{round(y(la)-y(lb),1)}" fill="#dc2626" fill-opacity="{op}"/>'
lab=lambda lat,txt:f'<text x="8" y="{y(lat)-5}" font-size="14" font-weight="600" fill="#7f1d1d" stroke="#ffffff" stroke-width="3" paint-order="stroke">{txt}</text>'
# Meridianos y paralelos cada 30°, con su etiqueta en el borde.
gl=[]
for lat in range(-60,90,30):
    gl.append(f'<line x1="0" x2="{W}" y1="{y(lat)}" y2="{y(lat)}" stroke="#7a8496" stroke-width="{0.9 if lat==0 else 0.5}"/>')
    gl.append(f'<text x="{W-4}" y="{y(lat)-3}" font-size="11" text-anchor="end" fill="#4b5568" stroke="#ffffff" stroke-width="2.5" paint-order="stroke">{abs(lat)}°{"" if lat==0 else (" N" if lat>0 else " S")}</text>')
for lon in range(-150,180,30):
    x=P(lon,0)[0]
    gl.append(f'<line x1="{x}" x2="{x}" y1="0" y2="{H}" stroke="#7a8496" stroke-width="{0.9 if lon==0 else 0.5}"/>')
    gl.append(f'<text x="{x+3}" y="{H-5}" font-size="11" fill="#4b5568" stroke="#ffffff" stroke-width="2.5" paint-order="stroke">{abs(lon)}°{"" if lon==0 else (" E" if lon>0 else " O")}</text>')
reticula="".join(gl)
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="Segoe UI, Noto Sans, DejaVu Sans, Helvetica, Arial, sans-serif">
<rect width="{W}" height="{H}" fill="#e8f0f8"/>
<path d="{' '.join(d)}" fill="#c9ced6" stroke="#9aa3b2" stroke-width="0.5"/>
{band(A,B,0.28)}{band(B,90,0.5)}{band(-B,-A,0.28)}{band(-90,-B,0.5)}
{reticula}
{lab(B,"Más de 65.7°: también faltan salida y puesta del sol algunos días")}
{lab(A,"Más de 51.6°: faltan faŷr e ʿišāʾ en verano")}
<text x="8" y="{y(-A)+17}" font-size="14" font-weight="600" fill="#7f1d1d" stroke="#ffffff" stroke-width="3" paint-order="stroke">Más de 51.6° S: faltan faŷr e ʿišāʾ en verano austral</text>
<text x="8" y="{y(-B)+17}" font-size="14" font-weight="600" fill="#7f1d1d" stroke="#ffffff" stroke-width="3" paint-order="stroke">Más de 65.7° S: también faltan salida y puesta</text>
</svg>
'''
open(out,'w',encoding='utf8').write(svg)
print(len(svg))
