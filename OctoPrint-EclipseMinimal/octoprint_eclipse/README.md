# Eclipse Minimal Premium — OctoPrint Theme Plugin

Ultra-minimal, monochromatic theme for OctoPrint inspired by Tesla's UI language.  
Aplica el sistema de diseño **Eclipse Minimal Premium** a toda la interfaz de OctoPrint.

---

## Instalación

### Opción A — desde el gestor de plugins de OctoPrint (recomendado)

1. Abre OctoPrint → **Settings → Plugin Manager → Get More**.
2. Pega esta URL en el campo "Install from URL":

```
https://github.com/TU_USUARIO/OctoPrint-EclipseMinimal/archive/main.zip
```

3. Haz clic en **Install** y reinicia OctoPrint.

---

### Opción B — instalación manual desde el ZIP

1. Descarga o clona este repositorio.
2. En el servidor donde corre OctoPrint, ejecuta:

```bash
# Activa el entorno virtual de OctoPrint si lo tienes
source ~/OctoPrint/venv/bin/activate

# Instala el plugin
pip install /ruta/al/OctoPrint-EclipseMinimal

# Reinicia OctoPrint
sudo systemctl restart octoprint
```

---

### Opción C — instalación directa en Raspberry Pi (OctoPi)

```bash
# Conéctate por SSH a la Pi
ssh pi@octopi.local

# Instala el plugin con el pip de OctoPrint
~/oprint/bin/pip install /ruta/al/octoprint_eclipse

# Reinicia
sudo service octoprint restart
```

---

## Estructura del plugin

```
OctoPrint-EclipseMinimal/
├── setup.py
└── octoprint_eclipse/
    ├── __init__.py          ← Registro del plugin en OctoPrint
    └── static/
        ├── css/
        │   └── eclipse.css  ← Toda la estética (variables, overrides)
        └── js/
            └── eclipse.js   ← Tweaks en tiempo de ejecución
```

## Qué modifica

| Elemento OctoPrint | Cambio aplicado |
|---|---|
| Navbar / topbar | Blanco puro, tipografía `Inter 700` uppercase, sin gradientes |
| Sidebar accordions | Cards con `border-radius: 12px`, labels en `8.5pt uppercase` |
| Botones | Flat `#F4F4F4`, sin sombras, hover `#EAEAEA` |
| Inputs & selects | Borde `#EAEAEA`, focus `#8E8E93`, sin sombra |
| Tablas | Headers `7.5pt uppercase muted`, rows con separador `#F9F9F9` |
| Progress bars | `height: 3px`, color `#333333`, sin gradientes |
| Temperatura | Números gigantes `48pt weight-300` |
| Modals | `border-radius: 12px`, backdrop desenfocado, sin sombras duras |
| Terminal GCode | Fondo `#FBFBFB`, monospace, borde `#EAEAEA` |
| Tabs Bootstrap | Animación `eclipseFadeIn` en cada cambio de pestaña |
| Scrollbar | `4px`, gris claro, sin track visible |

## Paleta de colores

| Variable | Hex | Uso |
|---|---|---|
| `--ec-bg` | `#FFFFFF` | Fondo principal |
| `--ec-surface` | `#FBFBFB` | Cards y secciones |
| `--ec-border` | `#EAEAEA` | Bordes principales |
| `--ec-text-primary` | `#333333` | Títulos y números |
| `--ec-text-secondary` | `#555555` | Texto descriptivo |
| `--ec-text-muted` | `#8E8E93` | Labels y subtítulos |
| `--ec-text-subtle` | `#AAAAAA` | Unidades y placeholders |
| `--ec-online` | `#2ECC71` | Estado conectado |
| `--ec-offline` | `#E74C3C` | Estado desconectado / error |

## Licencia

MIT
