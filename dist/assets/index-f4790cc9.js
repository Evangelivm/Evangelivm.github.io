(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const i=document.querySelectorAll(".slide");i[0].classList.add("active");let s=0;function u(){i[s].classList.remove("active"),s=(s+1)%i.length,i[s].classList.add("active")}setInterval(u,3e3);fetch("data.json").then(r=>r.json()).then(r=>{const o=document.querySelector(".card__image"),l=document.querySelector(".tag"),n=document.querySelector("h4"),e=document.querySelector("p"),t=document.querySelector(".user__info h5"),c=document.querySelector(".user__info small");o.src=r.imageSrc,l.textContent=r.tag,n.textContent=r.title,e.textContent=r.plot,t.textContent=r.userName,c.textContent=r.time}).catch(r=>{console.error("Error al cargar el JSON:",r)});
