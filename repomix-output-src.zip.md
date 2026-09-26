This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  assets/
    hero.png
    react.svg
    vite.svg
  components/
    CardProductos.css
    CardProductos.jsx
    ProductList.css
    ProductList.jsx
  data/
    products.json
  ejemplos/
    Card.css
    Card.jsx
    CardTeams.jsx
    index.html
    OnOff.css
    OnOff.jsx
    pelis.html
    pelis.js
    ProductCard.css
    ProductCard.jsx
    script.js
    SearchableVideoList.jsx
    styles.css
    TwitterFollowCard.jsx
    Video.jsx
    VideoList.jsx
  App.css
  App.jsx
  index.css
  main.jsx
```

# Files

## File: src/assets/react.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

## File: src/assets/vite.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
```

## File: src/components/CardProductos.css
```css
.card-producto {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-producto:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.producto-imagen-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f5f5f5;
}

.producto-imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-producto:hover .producto-imagen {
  transform: scale(1.05);
}

.producto-categoria {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #007bff;
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.producto-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.producto-nombre {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  max-height: 2.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.producto-descripcion {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 1rem 0;
  line-height: 1.4;
  max-height: 2.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.producto-rating {
  margin: 0.75rem 0;
}

.stars {
  font-size: 0.95rem;
  color: #ff9800;
  font-weight: 500;
}

.producto-stock {
  margin: 0.75rem 0;
}

.en-stock {
  color: #4caf50;
  font-size: 0.9rem;
  font-weight: 600;
}

.sin-stock {
  color: #f44336;
  font-size: 0.9rem;
  font-weight: 600;
}

.producto-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.producto-precio {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff9800;
}

.btn-agregar {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 0.9rem;
}

.btn-agregar:hover {
  background: #0056b3;
}

.btn-agregar:active {
  transform: scale(0.98);
}
```

## File: src/components/CardProductos.jsx
```javascript
import React from 'react';
import './CardProductos.css';

const CardProductos = ({ product }) => {
  return (
    <div className="card-producto">
      <div className="producto-imagen-container">
        <img 
          src={product.imagen} 
          alt={product.nombre} 
          className="producto-imagen"
        />
        <span className="producto-categoria">{product.categoria}</span>
      </div>
      
      <div className="producto-info">
        <h3 className="producto-nombre">{product.nombre}</h3>
        <p className="producto-descripcion">{product.descripcion}</p>
        
        <div className="producto-rating">
          <span className="stars">⭐ {product.rating}</span>
        </div>
        
        <div className="producto-stock">
          <span className={product.stock > 0 ? 'en-stock' : 'sin-stock'}>
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
          </span>
        </div>
        
        <div className="producto-footer">
          <span className="producto-precio">${product.precio}</span>
          <button className="btn-agregar">Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default CardProductos;
```

## File: src/components/ProductList.css
```css
.product-list-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-list-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .product-list-title {
    font-size: 1.8rem;
  }
}
```

## File: src/components/ProductList.jsx
```javascript
import React from 'react';
import products from '../data/products.json';
import CardProductos from './CardProductos';
import './ProductList.css';

const ProductList = () => {
  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Nuestros Productos</h2>
      <div className="products-grid">
        {products.map((product) => (
          <CardProductos key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
```

## File: src/data/products.json
```json
[
  {
    "id": 1,
    "nombre": "Laptop Pro",
    "descripcion": "Laptop de alta performance para profesionales",
    "precio": 1299.99,
    "categoria": "Electrónica",
    "imagen": "https://via.placeholder.com/300x300?text=Laptop+Pro",
    "stock": 15,
    "rating": 4.5
  },
  {
    "id": 2,
    "nombre": "Auriculares Inalámbricos",
    "descripcion": "Auriculares con cancelación de ruido activa",
    "precio": 199.99,
    "categoria": "Audio",
    "imagen": "https://via.placeholder.com/300x300?text=Auriculares",
    "stock": 42,
    "rating": 4.8
  },
  {
    "id": 3,
    "nombre": "Monitor 4K",
    "descripcion": "Monitor ultrawide 4K de 34 pulgadas",
    "precio": 599.99,
    "categoria": "Pantallas",
    "imagen": "https://via.placeholder.com/300x300?text=Monitor+4K",
    "stock": 8,
    "rating": 4.7
  },
  {
    "id": 4,
    "nombre": "Teclado Mecánico",
    "descripcion": "Teclado mecánico RGB con switches Cherry MX",
    "precio": 149.99,
    "categoria": "Periféricos",
    "imagen": "https://via.placeholder.com/300x300?text=Teclado",
    "stock": 25,
    "rating": 4.6
  },
  {
    "id": 5,
    "nombre": "Ratón Gaming",
    "descripcion": "Ratón óptico de precisión con 12 botones",
    "precio": 79.99,
    "categoria": "Periféricos",
    "imagen": "https://via.placeholder.com/300x300?text=Raton",
    "stock": 38,
    "rating": 4.4
  },
  {
    "id": 6,
    "nombre": "Webcam HD",
    "descripcion": "Webcam 1080p con micrófono integrado",
    "precio": 89.99,
    "categoria": "Accesorios",
    "imagen": "https://via.placeholder.com/300x300?text=Webcam",
    "stock": 20,
    "rating": 4.3
  }
]
```

## File: src/ejemplos/Card.css
```css
.card {
    width: 200px;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.card img {
    width: 100%;
    height: auto;
    border-radius: 4px;
}

.card-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 8px 0;
    text-align: center;
}

.card-description {
    font-size: 0.9rem;
    color: #666;
    text-align: center;
}

.card__button--following {
    background-color: green;
    padding: 2px;
}

.card__button-not-following {
    background-color: red;
    padding: 2px;
}
```

## File: src/ejemplos/Card.jsx
```javascript
import React from 'react';
import { useState } from 'react';
import './Card.css'; // Optional: Add styles for the card
import OnOff from './OnOff.jsx';

const Card = ({ children, userName, onFollow='false', formatUserName }) => {
    const [isFollowing, setIsFollowing] = useState(onFollow === 'true');
    const [count, setCount] = useState(0);

    // function handleFollow() {
    //     setIsFollowing(!isFollowing);
    // }
    //funcion igual que la anterior pero con arrow function
    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    }

    const text = isFollowing ? 'Dejar de Seguir' : 'Seguir';
    const buttonStyle= isFollowing ? 'card__button--following' : 'card__button-not-following';

    return (
        <div className="card">
            <img src={`https://unavatar.io/github/${userName}`} alt={`${userName}'s profile`} className="card__image" />
            <div className="card__info">
                <div className="card-title">{children}</div>
                <p className="card__username">{formatUserName(userName)}</p>
                <button className={buttonStyle} onClick={handleFollow}>
                    {text}
                </button>
            </div>
        </div>  
    );
};

export default Card;
```

## File: src/ejemplos/CardTeams.jsx
```javascript

```

## File: src/ejemplos/index.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Videos (JS puro)</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <section id="video-list-container"></section>

    <script src="script.js"></script>

</body>
</html>
```

## File: src/ejemplos/OnOff.css
```css
.on {
    background-color: green;
    display: inline-block;
    padding: 10px;
    color: white;
    font-size: 20px;
    border-radius: 5px;
  }
  
  .off {
    background-color: red;
    display: inline-block;
    padding: 10px;
    color: white;
    font-size: 20px;
    border-radius: 5px;
  }
```

## File: src/ejemplos/OnOff.jsx
```javascript
import React, { useState } from 'react';
import './OnOff.css';
import Card from './Card';

function OnOff() {
  //setea por defecto el estado del botón en "Encendido" true
  //setIsOn es la función que se encarga de actualizar el estado del botón
  //useState es un hook que permite agregar estado a un componente funcional
  const [isOn, setIsOn] = useState(true);

  //Función que se ejecuta al hacer click en el botón, cambia el estado del botón a su valor contrario
  const handleClick = () => {
    setIsOn(!isOn);
  };

  return (
    <button
      id="btn"
      className={isOn ? 'on' : 'off'}
      onClick={handleClick}
    >
      {isOn ? 'Encendido' : 'Apagado'}
    </button>
    
  );
}

export default OnOff;
```

## File: src/ejemplos/pelis.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Videos Buscable</title>
</head>
<body>
    <div>
        <input type="text" id="searchInput" placeholder="Buscar videos...">
    </div>
    <div id="videoListContainer">
        </div>

    <script src="pelis.js"></script>
</body>
</html>
```

## File: src/ejemplos/pelis.js
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const videoListContainer = document.getElementById('videoListContainer');
    const initialVideos = [
        { id: 1, title: 'Gatos Graciosos' },
        { id: 2, title: 'Aprende JavaScript' },
        { id: 3, title: 'Recetas Fáciles' },
        { id: 4, title: 'Guía de HTML y CSS' },
        { id: 5, title: 'Programación en Python' },
    ];

    let currentVideos = initialVideos;

    function filterVideos(videos, searchText) {
        if (!searchText) {
            return videos;
        }
        const lowerSearchText = searchText.toLowerCase();
        return videos.filter(video =>
            video.title.toLowerCase().includes(lowerSearchText)
        );
    }

    function renderVideoList(videos, emptyHeading) {
        videoListContainer.innerHTML = ''; // Limpiar la lista anterior
        if (videos.length === 0) {
            const emptyMessage = document.createElement('h3');
            emptyMessage.textContent = emptyHeading;
            videoListContainer.appendChild(emptyMessage);
            return;
        }

        const ul = document.createElement('ul');
        videos.forEach(video => {
            const li = document.createElement('li');
            li.textContent = video.title;
            ul.appendChild(li);
        });
        videoListContainer.appendChild(ul);
    }

    // Renderizar la lista inicial de videos
    renderVideoList(currentVideos, 'No hay videos disponibles.');

    // Escuchar los cambios en el input de búsqueda
    searchInput.addEventListener('input', (event) => {
        const searchText = event.target.value;
        const foundVideos = filterVideos(initialVideos, searchText);
        renderVideoList(foundVideos, `No hay coincidencias para “${searchText}”`);
        currentVideos = foundVideos; // Actualizar la lista actual
    });
});
```

## File: src/ejemplos/ProductCard.css
```css
/* Estilos para la tarjeta de producto */
.product-card {
    width: 280px;
    padding: 15px;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    font-family: Arial, sans-serif;
    position: relative;
    margin: 10px;
    display: flex;
    flex-direction: column;
  }
  
  .recent-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #f5f5f5;
    color: #666;
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 4px;
    z-index: 1;
  }
  
  .product-image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  
  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .product-image:hover {
    transform: scale(1.05);
  }
  
  .product-title {
    margin: 0 0 15px 0;
    font-size: 16px;
    font-weight: normal;
    color: #333;
    line-height: 1.4;
    flex-grow: 1;
  }
  
  .product-price {
    font-size: 20px;
    font-weight: bold;
    color: #000;
    margin-top: auto;
  }
```

## File: src/ejemplos/ProductCard.jsx
```javascript
import React from 'react';
import './ProductCard.css';

const ProductCard = () => {
  return (
    <div className="product-card">
      <div className="recent-badge">Visto recientemente</div>
      <div className="product-image-container">
        <img 
          src="https://http2.mlstatic.com/D_NQ_NP_751447-MLA76205335677_052024-O.webp" 
          alt="Guantes Mujer Mitones" 
          className="product-image"
        />
      </div>
      <h3 className="product-title">Guantes Mujer Mitones Dedos Lana Largos...</h3>
      <div className="product-price">$ 12.890</div>
    </div>
  );
};

export default ProductCard;
```

## File: src/ejemplos/script.js
```javascript
// Simulación de los datos de los videos que normalmente vendrían de una API
const videos = [
    { id: 1, title: 'Video 1', url: 'https://youtube.com/video1', description: 'Descripción del video 1' },
    { id: 2, title: 'Video 2', url: 'https://youtube.com/video2', description: 'Descripción del video 2' },
    { id: 3, title: 'Video 3', url: 'https://youtube.com/video3', description: 'Descripción del video 3' },
];

const emptyHeading = "No hay videos disponibles";

// Función que crea el elemento HTML para un solo video
function crearVideoElemento(video) {
    const div = document.createElement('div');
    // Nota: Aquí necesitaríamos lógica para el 'Thumbnail' y el 'LikeButton',
    // que requerirían más funciones y elementos HTML.
    
    const h3 = document.createElement('h3');
    h3.textContent = video.title;

    const p = document.createElement('p');
    p.textContent = video.description;

    const a = document.createElement('a');
    a.href = video.url;
    a.appendChild(h3);
    a.appendChild(p);
    
    div.appendChild(a);

    return div;
}

// Función principal que genera toda la lista
function VideoList(videos, emptyHeading) {
    const count = videos.length;
    let heading;
    if (count > 0) {
        const noun = count > 1 ? 'Videos' : 'Video';
        heading = count + ' ' + noun;
    } else {
        heading = emptyHeading;
    }

    // Selecciona el contenedor del HTML
    const container = document.getElementById('video-list-container');

    // Crea el título de la sección
    const headingElement = document.createElement('h2');
    headingElement.textContent = heading;
    container.appendChild(headingElement);

    // Itera sobre el array de videos para crear cada elemento
    videos.forEach(video => {
        const videoElement = crearVideoElemento(video);
        container.appendChild(videoElement);
    });
}

// Llama a la función para renderizar la lista
VideoList(videos, emptyHeading);
```

## File: src/ejemplos/SearchableVideoList.jsx
```javascript
// 1. Importamos la función useState del paquete de React.
// Esta función es lo que nos permite añadir "estado" o "memoria" a un componente.
import { useState } from 'react';
import VideoList from './VideoList.jsx';

// 2. Definimos el componente funcional 'SearchableVideoList'.
// Este componente recibe la prop 'videos', que es un array con todos los videos disponibles.
function SearchableVideoList({ videos }) {

  // 3. Aquí usamos useState. Le pedimos a React una "cajita de memoria"
  // para guardar el texto que el usuario escribe en la barra de búsqueda.
  // El valor inicial es una cadena vacía ('').
  // useState nos devuelve dos cosas en un array:
  // - searchText: La variable que guarda el valor actual de la memoria.
  // - setSearchText: La función que usaremos para actualizar ese valor y avisarle a React que cambie la interfaz.
   // Cuando usas useState y luego llamas a la función que actualiza el estado (setSearchText en este caso), le estás diciendo a React que vuelva a renderizar el componente con el nuevo valor.
  const [searchText, setSearchText] = useState('');
  // así se declara una estado y su setter x defecto
  const [btnText, setBtnText] = useState('Buscar');
  const [onoff, setOnOff] = useState(false);

  // 4. Llamamos a una función 'filterVideos' (que asumimos que está definida en otro lugar).
  // Esta función filtra el array original de 'videos' usando el texto de búsqueda actual (searchText).
  // El resultado se guarda en la variable 'foundVideos'.
  const foundVideos = filterVideos(videos, searchText);

  // 5. El componente retorna la interfaz de usuario que se mostrará en la pantalla.
  return (
    // <> y </> son "Fragmentos" de React. Nos permiten agrupar elementos
    // sin añadir un div extra al DOM.
    <>
      {/* // 6. Usamos un componente 'SearchInput' (barra de búsqueda).
      // - Le pasamos el valor actual del estado (searchText) para que el campo de texto se muestre correctamente. */}
      <SearchInput
        value={searchText}
        // - Con 'onChange', le decimos qué hacer cuando el usuario escribe.
        // - Cuando el texto cambia, llamamos a setSearchText() para actualizar el estado
        // con el nuevo texto (newText). Esto provoca que el componente se vuelva a renderizar.
        onChange={newText => setSearchText(newText)} />
        
      {/* // 7. Usamos el componente 'VideoList' que ya conocemos.
      // - Le pasamos el array filtrado 'foundVideos' para que solo muestre los videos que coinciden. */}
      <VideoList
        videos={foundVideos}
        // - Le pasamos un encabezado dinámico que muestra el texto de búsqueda cuando no hay resultados.
        emptyHeading={`No matches for “${searchText}”`} />
    </>
  );
}
```

## File: src/ejemplos/styles.css
```css
/* Estilos generales del cuerpo */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
    color: #333;
    padding: 20px;
    margin: 0;
    display: flex;
    justify-content: center;
}

/* Estilos para el contenedor principal de la lista de videos */
#video-list-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
}

/* Estilos para el título de la sección */
#video-list-container h2 {
    text-align: center;
    color: #444;
    margin-bottom: 20px;
}

/* Estilos para cada video */
#video-list-container div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    transition: transform 0.2s ease-in-out;
}

/* Efecto al pasar el mouse por encima de cada video */
#video-list-container div:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Estilos para los enlaces */
#video-list-container a {
    text-decoration: none;
    color: inherit;
}

/* Estilos para el título del video */
#video-list-container h3 {
    margin: 0 0 5px 0;
    color: #007bff;
    font-size: 1.2em;
}

/* Estilos para la descripción del video */
#video-list-container p {
    margin: 0;
    color: #666;
    font-size: 0.9em;
}
```

## File: src/ejemplos/TwitterFollowCard.jsx
```javascript
import { useState } from 'react'

export function TwitterFollowCard ({ children, userName, initialIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  const text = isFollowing ? 'Dejar de Seguir' : 'Seguir'
  const buttonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'

  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img
          className='tw-followCard-avatar'
          alt='perfil'
          src={`https://unavatar.io/${userName}`}
        />
        <div className='tw-followCard-info'>
          <strong>{children}</strong>
          <span className='tw-followCard-infoUserName'>@{userName}</span>
        </div>
      </header>

      <aside>
        <button className={buttonClassName} onClick={handleClick}>
          <div className='tw-followCard-text'>{text}</div>
        </button>
      </aside>
    </article>
  )
}

export default TwitterFollowCard
```

## File: src/ejemplos/Video.jsx
```javascript
import React from 'react';


// Definimos un componente funcional en React llamado 'Video'.
// Recibe un único parámetro, 'video', que es un objeto con la información de un video.
function Video({ video }) {
  
  // El 'return' es lo que el componente va a renderizar o dibujar en la pantalla.
  return (
    
    // Este 'div' actúa como un contenedor principal para organizar todos los elementos del video.
    <div>
      
      {/* // Aquí usamos otro componente llamado 'Thumbnail'.
      // Le pasamos todo el objeto 'video' como una propiedad para que sepa qué miniatura mostrar. */}
      <Thumbnail video={video} />
      
      
      
      {/* // Creamos un enlace <a> que envuelve el título y la descripción del video.
      // La URL del enlace se toma directamente de la propiedad 'video.url'. */}
      <a href={video.url}>
        
        {/* // El título del video se muestra dentro de una etiqueta <h3>.
        // Usamos llaves {} para insertar el valor de la propiedad 'video.title' en el HTML. */}
        <h3>{video.title}</h3>
        
        {/* // La descripción del video se muestra en una etiqueta <p>.
        // De nuevo, usamos llaves para insertar el valor de 'video.description'. */}
        <p>{video.description}</p>
        
      </a>
      
      {/* // Incluimos otro componente, el 'LikeButton' (botón de me gusta).
      // También le pasamos el objeto 'video' para que pueda manejar la lógica de "Me gusta" para ese video en particular. */}
      <LikeButton video={video} />
      
    </div>
  );
}

export default Video;
```

## File: src/ejemplos/VideoList.jsx
```javascript
import React from 'react';

function VideoList({ videos, emptyHeading }) {
  const count = videos.length;
  let heading = emptyHeading;
  if (count > 0) {
    const noun = count > 1 ? 'Videos' : 'Video';
    heading = count + ' ' + noun;
  }
  return (
    <section>
      <h2>{heading}</h2>
      {videos.map(video =>
        <Video key={video.id} video={video} />
      )}
    </section>
  );
}
```

## File: src/App.css
```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
```

## File: src/App.jsx
```javascript
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
```

## File: src/index.css
```css
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }

  #social .button-icon {
    filter: invert(1) brightness(2);
  }
}

body {
  margin: 0;
}

#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
}
p {
  margin: 0;
}

code,
.counter {
  font-family: var(--mono);
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
}

code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}
```

## File: src/main.jsx
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductCard from './ejemplos/ProductCard.jsx'
import TwitterCard from './ejemplos/TwitterFollowCard.jsx'
import Video from './ejemplos/Video.jsx'
import OnOff from './ejemplos/OnOff.jsx'
import Card from './ejemplos/Card.jsx'
import ProductList from './components/ProductList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <p>hola mundo</p> */}
    {/* <ProductCard /> */}
    <ProductList />
    {/* <TwitterCard userName='jperez' initialIsFollowing={false} >
      @ssanchez
    </TwitterCard> */}
    {/* <OnOff /> */}
    {/* <Card userName='jsuarez' onFollow='false' formatUserName={(name) => name.toLowerCase()}>
    </Card>
    <Card userName='ssanchez' onFollow='false' formatUserName={(name) => name.toUpperCase()}>
      <p>Me gusta los deportes de montaña</p>
    </Card>

    <Card userName='hsuarez' onFollow='false' formatUserName={(name) => name.toUpperCase()}>
      <h4>Hugo Suárez</h4>
      <p>Me gusta los deportes de montaña</p>
      <a href="">Link a mi perfil de facebook</a>
      <OnOff />
    </Card>
 */}
    {/* <Card userName='nsanchez' onFollow='true' formatUserName={(name) => name.toUpperCase()}>
    </Card> */}
    {/* <Card userName='jperez' onFollow='true' formatUserName={(name) => name.toUpperCase()}>
      <p>Me gustan la tecnología</p>
      <div>
        <a href="">Link a Facebook</a>
        <a href="">Link a Instagram</a>
      </div>
      <OnOff />
    </Card>
    <Card userName='hperez' onFollow='true' formatUserName={(name) => name.toUpperCase()}>
      <p>Me gustan viajar</p>
      <OnOff />
    </Card>     */}

  </StrictMode>,
)
```
