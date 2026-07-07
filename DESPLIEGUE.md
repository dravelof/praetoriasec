# Despliegue en producción — Praetoria Cyber Security

**Sitio 100 % estático multipágina.** Cada ruta es un `index.html` real con su contenido en el HTML (sin React ni Babel en el navegador). No requiere paso de build.

## 1. GitHub
Suba el contenido del proyecto a un repositorio. Archivos/carpetas que entran a producción:

```
index.html                      · portada estática (raíz)
nosotros/  faq/  blog/          · páginas y artículos
programa/  formacion/           · programa/ = hub eSpartanos + 4 niveles; formacion/ = taller IA para Gerentes
politica-de-privacidad/  politica-de-cookies/
terminos-y-condiciones/  aviso-legal/  libro-de-reclamaciones/
colors_and_type.css
assets/                          · imágenes (WebP), fuentes (WOFF2), logos, consent.js
netlify.toml  _redirects  robots.txt  sitemap.xml  llms.txt
```

NO subir (documentos internos / prototipos / legado): `index-react-legacy.html` (portada React anterior, respaldo), `Praetoria Security.html`, `Praetoria Security (offline).html`, `app/`, `web/`, `build-pipeline-v2/`, `github-praetoria/`, `Brochure*`, `Cibersafe*`, `Canvas*.dc.html`, `Vista móvil.html`, `Manual de Marca*`, `uploads/`, `screenshots/`, `tweaks-panel.jsx`, `image-slot.js`, `browser-window.jsx`, `support.js`.

## 2. Netlify
- **New site from Git** → seleccione el repo.
- Build command: *(vacío)* · Publish directory: `.`
- `netlify.toml` define cabeceras de seguridad/caché; `_redirects` canonicaliza `/ruta/index.html → /ruta/`.
- **Netlify Forms**: activo. Se detectan solos por los `<form data-netlify="true">`:
  `contacto-espartanos` (portada), `inscripcion-ia-gerentes` (formación), `libro-reclamaciones` (Libro de Reclamaciones).

## 3. Enlaces internos
Todas las páginas enlazan con **URLs limpias** relativas (p. ej. `nosotros/`, `../../programa/human-firewall/`, `./` para el inicio), sin `index.html` — así se evitan saltos 301 y se envían señales internas directas a las URLs canónicas. Netlify las sirve con sus *Pretty URLs* (carpeta → `index.html`). Nota: al abrir el sitio localmente con doble clic o en una vista previa sin servidor de directorios, la navegación entre páginas puede mostrar 404; en Netlify funciona correctamente.

## 4. Google Analytics 4
GA4 (`G-ZWJDXEKYPE`) se carga vía `assets/consent.js` **solo tras aceptar cookies** (banner de consentimiento), en todas las páginas. Para cambiar el ID, edite `assets/consent.js`.

## 5. Google Search Console
Propiedad ya verificada por DNS. Tras desplegar:
1. En Search Console → **Sitemaps** → enviar `https://praetoriasec.com/sitemap.xml`.
2. Opcional: *Inspección de URL* → *Solicitar indexación* para la portada y las páginas nuevas.

> Ahora cada página tiene su propia URL indexable, `<title>`, meta description, canonical, Open Graph y JSON-LD (Organization, WebSite, Course, BlogPosting, FAQPage, AboutPage/Person). El contenido es rastreable sin ejecutar JavaScript, lo que mejora SEO y visibilidad en motores generativos (GEO).
