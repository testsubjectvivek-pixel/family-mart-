import{h as d,u as m,a as x,r as h,T as g,U as p,j as e,L as c}from"./index-Dd-AWh2G.js";import{L as y}from"./loader-xcyK-QGo.js";import{c as a}from"./createLucideIcon-Bd7R2cAa.js";/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],N=a("arrow-left",u);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],f=a("calendar",j);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],b=a("eye",v);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],w=a("user",k);function M(){const{slug:l}=d(),t=m(),{currentBlog:s,loading:n,error:i}=x(r=>r.blog);return h.useEffect(()=>(t(g(l)),()=>{t(p())}),[l,t]),n?e.jsx("div",{className:"min-h-screen bg-gray-50 py-8",children:e.jsx("div",{className:"container-app",children:e.jsx("div",{className:"flex justify-center py-12",children:e.jsx(y,{className:"w-8 h-8 animate-spin text-blinkit-green"})})})}):i||!s?e.jsx("div",{className:"min-h-screen bg-gray-50 py-8",children:e.jsx("div",{className:"container-app",children:e.jsxs("div",{className:"text-center py-12",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-800 mb-2",children:"Blog not found"}),e.jsx("p",{className:"text-gray-500 mb-4",children:"The blog you're looking for doesn't exist."}),e.jsx(c,{to:"/blog",className:"text-blinkit-green font-medium hover:underline",children:"Back to Blog"})]})})}):e.jsx("div",{className:"min-h-screen bg-gray-50 py-8",children:e.jsxs("div",{className:"container-app",children:[e.jsxs(c,{to:"/blog",className:"inline-flex items-center gap-2 text-gray-600 hover:text-blinkit-green mb-6",children:[e.jsx(N,{className:"w-4 h-4"}),"Back to Blog"]}),e.jsxs("article",{className:"max-w-3xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden",children:[s.featuredImage&&e.jsx("img",{src:s.featuredImage,alt:s.title,className:"w-full h-64 md:h-96 object-cover"}),e.jsxs("div",{className:"p-6 md:p-8",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-4 mb-4",children:[e.jsx("span",{className:"text-sm font-medium text-blinkit-green bg-blinkit-green/10 px-3 py-1 rounded-full capitalize",children:s.category}),e.jsxs("div",{className:"flex items-center gap-1 text-sm text-gray-500",children:[e.jsx(f,{className:"w-4 h-4"}),new Date(s.publishedAt).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})]}),e.jsxs("div",{className:"flex items-center gap-1 text-sm text-gray-500",children:[e.jsx(w,{className:"w-4 h-4"}),s.author]}),e.jsxs("div",{className:"flex items-center gap-1 text-sm text-gray-500",children:[e.jsx(b,{className:"w-4 h-4"}),s.views," views"]})]}),e.jsx("h1",{className:"text-2xl md:text-3xl font-bold text-gray-800 mb-6",children:s.title}),e.jsx("div",{className:"prose prose-gray max-w-none",dangerouslySetInnerHTML:{__html:s.content}}),s.tags&&s.tags.length>0&&e.jsx("div",{className:"mt-8 pt-6 border-t border-gray-100",children:e.jsx("div",{className:"flex flex-wrap gap-2",children:s.tags.map((r,o)=>e.jsxs("span",{className:"px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full",children:["#",r]},o))})})]})]})]})})}export{M as default};
