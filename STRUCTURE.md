# 📊 Estructura del Proyecto - FISIO Clinic

```
webAntonio/
│
├── 📄 index.html              # Página principal (estructura HTML)
├── 🎨 styles.css              # Estilos personalizados principales
├── ⚙️ config.css              # Variables CSS y configuración
├── 💻 script.js               # Funcionalidad JavaScript
│
├── 📁 components/             # Componentes CSS modulares
│   ├── header.css             # Estilos del header/navegación
│   ├── buttons.css            # Estilos de botones reutilizables
│   └── cards.css              # Estilos de tarjetas
│
├── 📚 README.md               # Documentación principal
├── 🎯 CUSTOMIZATION.md        # Guía de personalización
└── 🚫 .gitignore              # Archivos ignorados por Git
```

## 📋 Descripción de Archivos

### Archivos Principales

#### `index.html` (Líneas: ~500)
- **Propósito**: Estructura completa del sitio web
- **Secciones**:
  - Header con navegación
  - Hero / Portada
  - Por qué elegirnos
  - Servicios
  - Testimonios
  - Contacto
  - Footer
  - Modal de confirmación
- **Editar**: Para cambiar contenido, textos e imágenes

#### `styles.css` (Líneas: ~150)
- **Propósito**: Estilos personalizados del sitio
- **Contiene**:
  - Importación de Google Fonts
  - Variables CSS globales
  - Estilos de componentes (.icon-box)
  - Animaciones (fadeInUp)
  - Utilidades personalizadas
- **Editar**: Para ajustes de diseño general

#### `config.css` (Líneas: ~180)
- **Propósito**: Configuración centralizada
- **Contiene**:
  - Variables de colores
  - Variables de tipografía
  - Variables de espaciado
  - Variables de sombras
  - Breakpoints
  - Clases de utilidad
- **Editar**: Para cambios globales de diseño

#### `script.js` (Líneas: ~220)
- **Propósito**: Toda la funcionalidad interactiva
- **Módulos**:
  - Menú móvil
  - Formulario de contacto
  - Modal de confirmación
  - Smooth scroll
  - (Funciones opcionales comentadas)
- **Editar**: Para agregar/modificar funcionalidad

### Carpeta Components

#### `components/header.css`
- Estilos específicos del header
- Animaciones del menú móvil
- Efectos hover en navegación
- Responsive del header

#### `components/buttons.css`
- Botones primarios, secundarios, terciarios
- Tamaños (sm, lg)
- Estados (hover, disabled, loading)
- Botones con iconos

#### `components/cards.css`
- Tarjetas base
- Tarjetas de servicios
- Tarjetas de testimonios
- Tarjetas con imagen
- Grid de tarjetas responsive

### Documentación

#### `README.md`
- Descripción general del proyecto
- Tecnologías utilizadas
- Secciones del sitio
- Características
- Guía de uso
- Próximas mejoras

#### `CUSTOMIZATION.md`
- Guía paso a paso de personalización
- Cómo cambiar contenido
- Cómo cambiar diseño
- Cómo agregar funcionalidades
- Checklist pre-lanzamiento

## 🔄 Flujo de Trabajo

### Para cambiar CONTENIDO:
1. Abrir `index.html`
2. Buscar la sección específica
3. Modificar texto/imagen
4. Guardar y recargar navegador

### Para cambiar DISEÑO:
1. Opción A: Modificar `config.css` (cambios globales)
2. Opción B: Modificar `styles.css` (ajustes específicos)
3. Opción C: Editar clases de Tailwind en HTML

### Para cambiar FUNCIONALIDAD:
1. Abrir `script.js`
2. Buscar la función correspondiente
3. Modificar según necesidad
4. Probar en navegador

## 📊 Estadísticas del Proyecto

- **Total líneas HTML**: ~500
- **Total líneas CSS**: ~600 (todos los archivos)
- **Total líneas JS**: ~220
- **Secciones principales**: 7
- **Componentes reutilizables**: 15+
- **Responsive breakpoints**: 5
- **Paleta de colores**: 4 principales + variantes

## 🎯 Archivos por Prioridad de Edición

### Alta Prioridad (cambios frecuentes):
1. `index.html` - Contenido
2. `config.css` - Colores y variables

### Media Prioridad (cambios ocasionales):
3. `styles.css` - Ajustes de diseño
4. `script.js` - Funcionalidades

### Baja Prioridad (raramente):
5. `components/*.css` - Componentes específicos
6. `.gitignore` - Control de versiones

## 🔗 Dependencias Externas (CDN)

- **Tailwind CSS**: https://cdn.tailwindcss.com
- **Font Awesome 6**: https://cdnjs.cloudflare.com/.../font-awesome/6.5.2/
- **Google Fonts (Inter)**: https://fonts.googleapis.com/

## 📦 Tamaño de Archivos (aproximado)

```
index.html       : ~20 KB
styles.css       : ~5 KB
config.css       : ~8 KB
script.js        : ~8 KB
components/*.css : ~12 KB (total)
README.md        : ~8 KB
CUSTOMIZATION.md : ~10 KB
────────────────────────
TOTAL            : ~71 KB
```

## 🚀 Para Empezar

1. **Abrir** `index.html` en un navegador
2. **Leer** `README.md` para contexto
3. **Consultar** `CUSTOMIZATION.md` para personalizar
4. **Modificar** según necesidades
5. **Probar** en diferentes dispositivos

## 💡 Consejos

- ✅ Mantener la estructura modular
- ✅ Comentar cambios importantes
- ✅ Probar en múltiples navegadores
- ✅ Hacer backups antes de cambios grandes
- ✅ Usar las variables CSS para consistencia
- ✅ Seguir las convenciones de nombres existentes

---

**Nota**: Este proyecto está diseñado para ser fácil de mantener y escalar.
Cada archivo tiene un propósito específico y está bien documentado.
