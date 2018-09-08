!function(){"use strict";var r,n,u,k,h={};!function(){for(var n=0,t=["webkit","moz","o","ms"],e=0;e<t.length&&!window.requestAnimationFrame;e+=1)window.requestAnimationFrame=window[t[e]+"RequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,e){var i=(new Date).getTime(),o=Math.max(0,16-(i-n)),r=window.setTimeout(function(){t(i+o)},o);return n=i+o,r})}(),h.obj={extend:(r=Object.prototype.hasOwnProperty,n=Object.prototype.toString,u=function(t){if(!t||"[object Object]"!==n.call(t))return!1;var e,i=r.call(t,"constructor"),o=t.constructor&&t.constructor.prototype&&r.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!i&&!o)return!1;for(e in t);return void 0===e||r.call(t,e)},function t(){var e,i,o,r,n,s,a=arguments[0],c=1,l=arguments.length,h=!1;for("boolean"==typeof a?(h=a,a=arguments[1]||{},c=2):("object"!=typeof a&&"function"!=typeof a||null===a)&&(a={});c<l;++c)if(null!==(e=arguments[c]))for(i in e)o=a[i],a!==(r=e[i])&&(h&&r&&(u(r)||(n=Array.isArray(r)))?(s=n?(n=!1,o&&Array.isArray(o)?o:[]):o&&u(o)?o:{},a[i]=t(h,s,r)):void 0!==r&&(a[i]=r));return a})},h.obj.extend(!0,h,{vendor:{prefixes:["","ms","webkit","moz","o"],get:function(t){var e,i;for(i=0;i<this.prefixes.length;i++)if(e=this.prefixes[i]+(""===this.prefixes[i]?t:t.charAt(0).toUpperCase()+t.slice(1)),void 0!==document.body.style[e])return e;return null}},dom:{get:function(t){return document.getElementById(t)},create:function(t){return document.createElement(t)}},arr:{create:function(t,e){for(var i,o=[],r=0;r<t;r+=1)i=void 0===e?[]:e,o.push(i);return o},move:function(t,e,i){t[e]=t.splice(i,1,t[e])[0]},loop:function(t,e,i){for(var o=t.length,r=0;r<o;r+=1)e.call(i||null,t[r],r)}},rand:{intg:function(t){return Math.random()*(t||268435455)|0},flot:function(){return Math.random()},bool:function(){return.5<Math.random()},range:function(t,e){return h.rand.intg(e-t)+t},rangef:function(t,e){return h.rand.flot()*(e-t)+t},select:function(t){return t[h.rand.range(0,t.length)]}},PI2:2*Math.PI,RAD:Math.PI/180,DEG:180/Math.PI,noop:function(){},line:function(t,e,i,o,r,n,s){t.strokeStyle=n,t.lineWidth=s,t.beginPath(),t.moveTo(e,i),t.lineTo(o,r),t.stroke()},rect:function(t,e,i,o,r,n,s,a,c,l){e+=a,o-=2*a,i+=a,r-=2*a,t.beginPath(),t.strokeStyle=s,t.lineWidth=a,t.moveTo(e+n,i),t.lineTo(e+o-n,i),t.quadraticCurveTo(e+o,i,e+o,i+n),t.lineTo(e+o,i+r-n),t.quadraticCurveTo(e+o,i+r,e+o-n,i+r),t.lineTo(e+n,i+r),t.quadraticCurveTo(e,i+r,e,i+r-n),t.lineTo(e,i+n),t.quadraticCurveTo(e,i,e+n,i),t.closePath(),t.stroke(),c&&(t.fillStyle=c,t.fill()),l&&h.rect(t,e-a,i-a,o+2*a,r+2*a,1.2*n,l,a/2)},sine:function(t,e,i,o,r,n,s){var a=(e+o)/2,c=(i+r)/2;t.strokeStyle=n,t.lineWidth=s,t.beginPath(),t.moveTo(e,i),t.bezierCurveTo(e,i,a/2,1.5*c,a,c),t.bezierCurveTo(1.5*a,c/2,o,r,o,r),t.stroke()}}),h.obj.extend(!0,h,{columns:8,gap:2,speed:.1,gravity:.3,moveBg:!0,rumble:{decay:.4},starAmount:Math.floor(window.innerWidth/window.innerHeight*100),starColors:["#ffffff","#ffe9c4","#d4fbff"],elements:{FIRE:{color:"#ff3824",latency:50,against:{FIRE:20,EARTH:2,WATER:1,AIR:5},bricks:{empty:{energy:10},filled:{energy:20},special:{energy:40}},desc:"The Fire element, most effective against fire bricks, but least effective against water bricks.",spec:"Fire special brick explodes the whole column of bricks."},EARTH:{color:"#44db5e",latency:80,against:{FIRE:5,EARTH:20,WATER:2,AIR:1},bricks:{empty:{energy:10},filled:{energy:20},special:{energy:40}},desc:"The Earth element, most effective against earth bricks, but least effective against air bricks.",spec:"Earth special brick explodes surrounding bricks."},WATER:{color:"#54c7fc",latency:70,against:{FIRE:1,EARTH:2,WATER:20,AIR:5},bricks:{empty:{energy:10},filled:{energy:20},special:{energy:40}},desc:"The Water element, most effective against water bricks, but least effective against fire bricks.",spec:"Water special brick explodes the whole row of bricks."},AIR:{color:"#ffcd00",latency:60,against:{FIRE:5,EARTH:1,WATER:2,AIR:20},bricks:{empty:{energy:10},filled:{energy:20},special:{energy:40}},desc:"The Air element, most effective against air bricks, but least effective against earth bricks.",spec:"Air special brick explodes all the weak(stroked) air bricks."}}}),h.sprite={items:{},create:function(t,e,i,o){if(!this.get(t)){var r=document.createElement("canvas");r.width=e,r.height=i;var n=r.getContext("2d");n.save(),o(n),n.restore(),this.set(t,r)}return this.get(t)},set:function(t,e){this.items[t]=e},get:function(t){return this.items[t]},factory:function(){var e=h.brickWidth/10,i=h.brickWidth/2,o=h.brickHeight/2,r=h.brickWidth/10,n=e,s="rgba(255,255,255,0.8)",a="rgba(255,255,0,0.5)";this.create("AIR",h.brickWidth,h.brickWidth,function(t){var e=(h.brickWidth-2*r)/4;h.rect(t,0,0,h.brickWidth,h.brickWidth,n,h.elements.AIR.color,r,null,s),t.lineWidth=r,t.strokeStyle=h.elements.AIR.color,t.translate(r,0);for(var i=0;i<3;i++)t.beginPath(),t.moveTo(e,r),t.lineTo(e,h.brickWidth-r),t.stroke(),t.translate(e,0)}),this.create("AIR-SHOT",h.brickWidth,h.brickHeight,function(t){h.rect(t,i-e,0,2*e,h.brickHeight,2,h.elements.AIR.color,r,h.elements.AIR.color,a)}),this.create("AIR-BRICK-empty",h.brickWidth,h.brickHeight,function(t){h.rect(t,0,0,h.brickWidth,h.brickHeight,n,h.elements.AIR.color,r,null,s)}),this.create("AIR-BRICK-filled",h.brickWidth,h.brickHeight,function(t){h.rect(t,0,0,h.brickWidth,h.brickHeight,n,h.elements.AIR.color,r,h.elements.AIR.color,s)}),this.create("AIR-BRICK-special",h.brickWidth,h.brickHeight,function(t){t.fillStyle=h.elements.AIR.color,t.fillRect(i-o/2,r,o,h.brickHeight-2*r),h.rect(t,0,0,h.brickWidth,h.brickHeight,n,h.elements.AIR.color,r,null,s)}),this.create("EARTH",h.brickWidth,h.brickWidth,function(t){var e=(h.brickWidth-2*r)/4;h.rect(t,0,0,h.brickWidth,h.brickWidth,n,h.elements.EARTH.color,r,null,s),t.lineWidth=r,t.strokeStyle=h.elements.EARTH.color,t.translate(0,r);for(var i=0;i<3;i++)t.beginPath(),t.moveTo(r,e),t.lineTo(h.brickWidth-r,e),t.stroke(),t.translate(0,e)}),this.create("EARTH-SHOT",h.brickWidth,h.brickHeight,function(t){h.rect(t,i-e,0,2*e,h.brickHeight,2,h.elements.EARTH.color,r,h.elements.EARTH.color,a)}),this.create("EARTH-BRICK-empty",h.brickWidth,h.brickHeight,function(t){h.rect(t,0,0,h.brickWidth,h.brickHeight,n,h.elements.EARTH.color,r,null,s)}),this.create("EARTH-BRICK-filled",h.brickWidth,h.brickHeight,function(t){h.rect(t,0,0,h.brickWidth,h.brickHeight,n,h.elements.EARTH.color,r,h.elements.EARTH.color,s)}),this.create("EARTH-BRICK-special",h.brickWidth,h.brickHeight,function(t){t.fillStyle=h.elements.EARTH.color,t.fillRect(i-o/2,r,o,h.brickHeight-2*r),h.rect(t,0,0,h.brickWidth,h.brickHeight,n,h.elements.EARTH.color,r,null,s)}),this.create("WATER",h.brickWidth,h.brickWidth,function(t){var e=(h.brickWidth-2*r)/4;h.rect(t,0,0,h.brickWidth,h.brickWidth,n,h.elements.WATER.color,r,null,s),t.lineWidth=r,t.strokeStyle=h.elements.WATER.color,t.translate(0,r);for(var i=0;i<3;i++)h.sine(t,r,e,h.brickWidth-r,e),t.translate(0,e)}),this.create("WATER-SHOT",h.brickWidth,h.brickHeight,function(t){h.rect(t,i-e,0,2*e,h.brickHeight,2,h.elements.WATER.color,r,h.elements.WATER.color,a)}),this.create("WATER-BRICK-empty",h.brickWidth,h.brickHeight,function(t){h.rect(t,0,0,h.brickWidth,h.brickHeight,n,h.elements.WATER.color,r,null,s)}),this.create("WATER-BRICK-filled",h.brickWidth,h.brickHeight,function(t){h.rect(t,0,0,h.brickWidth,h.brickHeight,n,h.elements.WATER.color,r,h.elements.WATER.color,s)}),this.create("WATER-BRICK-special",h.brickWidth,h.brickHeight,function(t){h.line(t,2*r,o,h.brickWidth-2*r,o,h.elements.WATER.color,r),h.rect(t,0,0,h.brickWidth,h.brickHeight,n,h.elements.WATER.color,r,null,s)}),this.create("FIRE",h.brickWidth,h.brickWidth,function(t){var e=(h.brickWidth-2*r)/4;h.rect(t,0,0,h.brickWidth,h.brickWidth,n,h.elements.FIRE.color,r,null,s),t.lineWidth=r,t.strokeStyle=h.elements.FIRE.color,t.translate(-r,0),t.translate(h.brickWidth/2,h.brickWidth/2),t.rotate(90*h.RAD),t.translate(-h.brickWidth/2,-h.brickWidth/2);for(var i=0;i<3;i++)h.sine(t,r,e,h.brickWidth-r,e),t.translate(0,e)}),this.create("FIRE-SHOT",h.brickWidth,h.brickHeight,function(t){h.rect(t,i-e,0,2*e,h.brickHeight,2,h.elements.FIRE.color,r,h.elements.FIRE.color,a)}),this.create("FIRE-BRICK-empty",h.brickWidth,h.brickHeight,function(t){h.rect(t,0,0,h.brickWidth,h.brickHeight,n,h.elements.FIRE.color,r,null,s)}),this.create("FIRE-BRICK-filled",h.brickWidth,h.brickHeight,function(t){h.rect(t,0,0,h.brickWidth,h.brickHeight,n,h.elements.FIRE.color,r,h.elements.FIRE.color,s)}),this.create("FIRE-BRICK-special",h.brickWidth,h.brickHeight,function(t){h.line(t,i,2*r,i,h.brickHeight-2*r,h.elements.FIRE.color,r),h.rect(t,0,0,h.brickWidth,h.brickHeight,n,h.elements.FIRE.color,r,null,s)}),["#ffffff","#ed8500","#ffff00"].forEach(function(e){this.create("explosion"+e,h.brickWidth,h.brickHeight,function(t){h.rect(t,0,0,h.brickWidth,h.brickHeight,0,e,0,e)})},this)}},function(){function t(){this.setSettings=function(t){for(var e=0;e<24;e++)this[String.fromCharCode(97+e)]=t[e]||0;this.c<.01&&(this.c=.01);var i=this.b+this.c+this.e;if(i<.18){var o=.18/i;this.b*=o,this.c*=o,this.e*=o}}}var l=new function(){var N,V,X,J,Q,Y,Z,$,tt,et,it,ot;this._params=new t,this.reset=function(){var t=this._params;J=100/(t.f*t.f+.001),Q=100/(t.g*t.g+.001),Y=1-t.h*t.h*t.h*.01,Z=-t.i*t.i*t.i*1e-6,t.a||(it=.5-t.n/2,ot=5e-5*-t.o),$=1+t.l*t.l*(0<t.l?-.9:10),tt=0,et=1==t.m?0:(1-t.m)*(1-t.m)*2e4+32},this.totalReset=function(){this.reset();var t=this._params;return N=t.b*t.b*1e5,V=t.c*t.c*1e5,X=t.e*t.e*1e5+12,3*((N+V+X)/3|0)},this.synthWave=function(t,e){var i=this._params,o=1!=i.s||i.v,r=i.v*i.v*.1,n=1+3e-4*i.w,s=i.s*i.s*i.s*.1,a=1+1e-4*i.t,c=1!=i.s,l=i.x*i.x,h=i.g,u=i.q||i.r,f=i.r*i.r*i.r*.2,d=i.q*i.q*(i.q<0?-1020:1020),m=i.p?32+((1-i.p)*(1-i.p)*2e4|0):0,p=i.d,v=i.j/2,g=i.k*i.k*.01,b=i.a,y=N,w=1/N,k=1/V,x=1/X,_=5/(1+i.u*i.u*20)*(.01+s);.8<_&&(_=.8),_=1-_;for(var A,W,R,T,E,C,H=!1,I=0,S=0,M=0,q=0,B=0,D=0,F=0,L=0,G=0,P=0,j=new Array(1024),O=new Array(32),K=j.length;K--;)j[K]=0;for(K=O.length;K--;)O[K]=2*Math.random()-1;for(K=0;K<e;K++){if(H)return K;if(m&&++G>=m&&(G=0,this.reset()),et&&++tt>=et&&(et=0,J*=$),Q<(J*=Y+=Z)&&(J=Q,0<h&&(H=!0)),W=J,0<v&&(P+=g,W*=1+Math.sin(P)*v),(W|=0)<8&&(W=8),b||((it+=ot)<0?it=0:.5<it&&(it=.5)),++S>y)switch(S=0,++I){case 1:y=V;break;case 2:y=X}switch(I){case 0:M=S*w;break;case 1:M=1+2*(1-S*k)*p;break;case 2:M=1-S*x;break;case 3:H=!(M=0)}u&&((R=0|(d+=f))<0?R=-R:1023<R&&(R=1023)),o&&n&&((r*=n)<1e-5?r=1e-5:.1<r&&(r=.1)),C=0;for(var z=8;z--;){if(W<=++F&&(F%=W,3==b))for(var U=O.length;U--;)O[U]=2*Math.random()-1;switch(b){case 0:E=F/W<it?.5:-.5;break;case 1:E=1-F/W*2;break;case 2:E=.225*(((E=1.27323954*(T=6.28318531*(.5<(T=F/W)?T-1:T))+.405284735*T*T*(T<0?1:-1))<0?-1:1)*E*E-E)+E;break;case 3:E=O[Math.abs(32*F/W|0)]}o&&(A=D,(s*=a)<0?s=0:.1<s&&(s=.1),c?(B+=(E-D)*s,B*=_):(D=E,B=0),q+=(D+=B)-A,E=q*=1-r),u&&(j[L%1024]=E,E+=j[(L-R+1024)%1024],L++),C+=E}C*=.125*M*l,t[K]=1<=C?32767:C<=-1?-32768:32767*C|0}return e}};window.jsfxr=function(t){l._params.setSettings(t);var e=l.totalReset(),i=new Uint8Array(4*((e+1)/2|0)+44),o=2*l.synthWave(new Uint16Array(i.buffer,44),e),r=new Uint32Array(i.buffer,0,44);r[0]=1179011410,r[1]=o+36,r[2]=1163280727,r[3]=544501094,r[4]=16,r[5]=65537,r[6]=44100,r[7]=88200,r[8]=1048578,r[9]=1635017060,r[10]=o,o+=44;for(var n=0,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a="data:audio/wav;base64,";n<o;n+=3){var c=i[n]<<16|i[n+1]<<8|i[n+2];a+=s[c>>18]+s[c>>12&63]+s[c>>6&63]+s[63&c]}return a}}(),function(){var t=null;function y(t){return Math.sin(6.283184*t)}var i=[y,function(t){return y(t)<0?-1:1},function(t){return t%1-.5},function(t){var e=t%1*4;return e<2?e-1:3-e}];function w(t){return.00390625*Math.pow(1.059463094,t-128)}function n(t,n){setTimeout(function(){var i=new Uint8Array(2*t*2),o=i.length-2,r=function(){for(var t=new Date,e=0;0<=o;)if(i[o]=0,i[o+1]=128,o-=2,(e+=1)%1e3==0&&33<new Date-t)return void setTimeout(r,0);setTimeout(function(){n(i)},0)};setTimeout(r,0)},0)}function b(n,s,t,e,a){var c=t.fx_delay_time*e>>1,l=t.fx_delay_amt/255,h=0,u=function(){for(var t=new Date,e=0;h<s-c;){var i=4*h,o=4*(h+c),r=n[o]+(n[o+1]<<8)+(n[i+2]+(n[i+3]<<8)-32768)*l;if(n[o]=255&r,n[o+1]=r>>8&255,r=n[o+2]+(n[o+3]<<8)+(n[i]+(n[i+1]<<8)-32768)*l,n[o+2]=255&r,n[o+3]=r>>8&255,++h,(e+=1)%1e3==0&&33<new Date-t)return void setTimeout(u,0)}setTimeout(a,0)};setTimeout(u,0)}(k={}).AudioGenerator=function(t){this.mixBuf=t,this.waveSize=t.length/2/2},k.AudioGenerator.prototype.getWave=function(){var t,e,i,o,r,n,s,a=this.mixBuf,c=2*this.waveSize*2;for(n=(r=c-8)-36,o=String.fromCharCode(82,73,70,70,255&r,r>>8&255,r>>16&255,r>>24&255,87,65,86,69,102,109,116,32,16,0,0,0,1,0,2,0,68,172,0,0,16,177,2,0,4,0,16,0,100,97,116,97,255&n,n>>8&255,n>>16&255,n>>24&255),t=0;t<c;){for(i="",e=0;e<256&&t<c;++e,t+=2)s=(s=4*(a[t]+(a[t+1]<<8)-32768))<-32768?-32768:32767<s?32767:s,i+=String.fromCharCode(255&s,s>>8&255);o+=i}return o},k.AudioGenerator.prototype.getAudio=function(){var t=this.getWave(),e=new Audio("data:audio/wav;base64,"+btoa(t));return e.preload="none",e.load(),e},k.AudioGenerator.prototype.getAudioBuffer=function(o){null===t&&(t=new AudioContext);var r=this.mixBuf,n=this.waveSize,s=t.createBuffer(2,this.waveSize,44100),a=s.getChannelData(0),c=s.getChannelData(1),l=0,h=function(){for(var t=new Date,e=0;l<n;){var i=4*(r[4*l]+(r[4*l+1]<<8)-32768);if(i=i<-32768?-32768:32767<i?32767:i,a[l]=i/32768,i=(i=4*(r[4*l+2]+(r[4*l+3]<<8)-32768))<-32768?-32768:32767<i?32767:i,c[l]=i/32768,l+=1,(e+=1)%1e3==0&&33<new Date-t)return void setTimeout(h,0)}setTimeout(function(){o(s)},0)};setTimeout(h,0)},k.SoundGenerator=function(t,e){this.instr=t,this.rowLen=e||5605,this.osc_lfo=i[t.lfo_waveform],this.osc1=i[t.osc1_waveform],this.osc2=i[t.osc2_waveform],this.attack=t.env_attack,this.sustain=t.env_sustain,this.release=t.env_release,this.panFreq=Math.pow(2,t.fx_pan_freq-8)/this.rowLen,this.lfoFreq=Math.pow(2,t.lfo_freq-8)/this.rowLen},k.SoundGenerator.prototype.genSound=function(t,e,i){new Date;for(var o=0,r=0,n=w(t+12*(this.instr.osc1_oct-8)+this.instr.osc1_det)*(1+8e-4*this.instr.osc1_detune),s=w(t+12*(this.instr.osc2_oct-8)+this.instr.osc2_det)*(1+8e-4*this.instr.osc2_detune),a=this.instr.fx_resonance/255,c=0,l=0,h=this.attack+this.sustain+this.release-1;0<=h;--h){var u=h+i,f=this.osc_lfo(u*this.lfoFreq)*this.instr.lfo_amt/512+.5,d=1;h<this.attack?d=h/this.attack:h>=this.attack+this.sustain&&(d-=(h-this.attack-this.sustain)/this.release);var m=n;this.instr.lfo_osc1_freq&&(m+=f),this.instr.osc1_xenv&&(m*=d*d),o+=m;var p=this.osc1(o)*this.instr.osc1_vol;m=s,this.instr.osc2_xenv&&(m*=d*d),r+=m,p+=this.osc2(r)*this.instr.osc2_vol,this.instr.noise_fader&&(p+=(2*Math.random()-1)*this.instr.noise_fader*d),p*=d/255;var v=this.instr.fx_freq;this.instr.lfo_fx_freq&&(v*=f);var g=a*(p-l)-(c+=(v=1.5*Math.sin(3.141592*v/44100))*l);switch(l+=v*g,this.instr.fx_filter){case 1:p=g;break;case 2:p=c;break;case 3:p=l;break;case 4:p=c+g}if(m=y(u*this.panFreq)*this.instr.fx_pan_amt/512+.5,p*=39*this.instr.env_master,(u*=4)+3<e.length){var b=e[u]+(e[u+1]<<8)+p*(1-m);e[u]=255&b,e[u+1]=b>>8&255,b=e[u+2]+(e[u+3]<<8)+p*m,e[u+2]=255&b,e[u+3]=b>>8&255}}},k.SoundGenerator.prototype.getAudioGenerator=function(e,i){var o=this.attack+this.sustain+this.release-1+32*this.rowLen,r=this;n(o,function(t){r.genSound(e,t,0),b(t,o,r.instr,r.rowLen,function(){i(new k.AudioGenerator(t))})})},k.SoundGenerator.prototype.createAudio=function(t,e){this.getAudioGenerator(t,function(t){e(t.getAudio())})},k.SoundGenerator.prototype.createAudioBuffer=function(t,e){this.getAudioGenerator(t,function(t){t.getAudioBuffer(e)})},k.MusicGenerator=function(t){this.song=t,this.waveSize=44100*t.songLen},k.MusicGenerator.prototype.generateTrack=function(p,v,g){var e=this;n(this.waveSize,function(o){var t=e.waveSize,r=2*e.waveSize*2,n=e.song.rowLen,s=e.song.endPattern,a=new k.SoundGenerator(p,n),c=0,l=0,h=0,u=function(){for(var t=new Date;;)if(32!==h){if(l===s-1)return void setTimeout(f,0);var e=p.p[l];if(e){var i=p.c[e-1].n[h];i&&a.genSound(i,o,c)}if(c+=n,h+=1,33<new Date-t)return void setTimeout(u,0)}else h=0,l+=1},f=function(){b(o,t,p,n,m)},d=0,m=function(){for(var t=new Date,e=0;d<r;){var i=v[d]+(v[d+1]<<8)+o[d]+(o[d+1]<<8)-32768;if(v[d]=255&i,v[d+1]=i>>8&255,d+=2,(e+=1)%1e3==0&&33<new Date-t)return void setTimeout(m,0)}setTimeout(g,0)};setTimeout(u,0)})},k.MusicGenerator.prototype.getAudioGenerator=function(o){var r=this;n(this.waveSize,function(t){var e=0,i=function(){e<r.song.songData.length?(e+=1,r.generateTrack(r.song.songData[e-1],t,i)):o(new k.AudioGenerator(t))};i()})},k.MusicGenerator.prototype.createAudio=function(e){this.getAudioGenerator(function(t){e(t.getAudio())})},k.MusicGenerator.prototype.createAudioBuffer=function(e){this.getAudioGenerator(function(t){t.getAudioBuffer(e)})}}(),h.music={generate:function(o,r){var n=new AudioContext;new k.MusicGenerator(this.tracks[o]).createAudioBuffer(function(t){var e=n.createBufferSource(),i=n.createGain();e.buffer=t,e.connect(i),i.connect(n.destination),e.volume=function(t){if(!(-1<t))return i.gain.value;i.gain.value=t},this.pool[o]=e,r(e)}.bind(this))},pool:{},tracks:{main:{songLen:198,songData:[{osc1_oct:9,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:161,osc1_waveform:0,osc2_oct:9,osc2_det:0,osc2_detune:4,osc2_xenv:0,osc2_vol:182,osc2_waveform:0,noise_fader:0,env_attack:100,env_sustain:1818,env_release:18181,env_master:192,fx_filter:0,fx_freq:0,fx_resonance:254,fx_delay_time:6,fx_delay_amt:108,fx_pan_freq:3,fx_pan_amt:61,lfo_osc1_freq:0,lfo_fx_freq:0,lfo_freq:3,lfo_amt:94,lfo_waveform:2,p:[1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,0,2,3,4,1,2,3,4,5,6,7,8,1,2,1,2,3,4,5,6,5,6,7,8],c:[{n:[142,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,140,0,0,0,0,0,0,0,138,0,0,0,0,0,0,0]},{n:[135,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,135,0,0,0,138,0,0,0]},{n:[140,0,138,0,135,0,0,0,0,0,0,0,0,0,130,0,142,0,140,0,135,0,0,0,0,0,0,0,138,0,0,0]},{n:[135,0,0,0,0,0,0,0,0,0,0,0,0,0,130,0,142,0,0,0,0,0,0,0,135,0,0,0,138,0,0,0]},{n:[123,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{n:[130,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{n:[128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{n:[119,131,0,0,0,0,0,0,0,0,0,0,0,0,0,0,126,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},{osc1_oct:8,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:0,osc1_waveform:0,osc2_oct:8,osc2_det:0,osc2_detune:0,osc2_xenv:0,osc2_vol:0,osc2_waveform:0,noise_fader:19,env_attack:100,env_sustain:0,env_release:3636,env_master:192,fx_filter:1,fx_freq:8100,fx_resonance:156,fx_delay_time:2,fx_delay_amt:22,fx_pan_freq:3,fx_pan_amt:43,lfo_osc1_freq:0,lfo_fx_freq:0,lfo_freq:0,lfo_amt:0,lfo_waveform:0,p:[0,0,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2],c:[{n:[135,0,135,0,0,135,0,135,135,0,135,0,0,135,0,135,135,0,135,0,0,135,0,135,135,0,135,0,0,135,0,135]},{n:[135,0,135,0,0,135,0,135,135,0,135,0,0,135,0,135,135,0,135,0,0,135,0,135,135,0,135,0,135,0,135,135]}]},{osc1_oct:6,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:192,osc1_waveform:1,osc2_oct:8,osc2_det:0,osc2_detune:8,osc2_xenv:0,osc2_vol:82,osc2_waveform:2,noise_fader:0,env_attack:100,env_sustain:4545,env_release:2727,env_master:192,fx_filter:3,fx_freq:2700,fx_resonance:85,fx_delay_time:6,fx_delay_amt:60,fx_pan_freq:6,fx_pan_amt:86,lfo_osc1_freq:0,lfo_fx_freq:1,lfo_freq:7,lfo_amt:106,lfo_waveform:0,p:[0,0,0,0,1,1,2,3,1,1,2,3,1,1,2,3,1,1,2,3,1,1,2,3,0,0,0,0,1,1,1,1,2,3],c:[{n:[135,135,147,135,0,135,147,135,135,135,147,135,0,135,147,135,135,135,147,135,0,135,147,135,135,135,147,135,0,135,147,135]},{n:[140,140,152,140,0,140,152,140,140,140,152,140,0,140,152,140,140,140,152,140,0,140,152,140,140,140,152,140,0,140,152,142]},{n:[131,131,143,131,0,131,143,131,131,131,143,131,0,131,143,131,138,138,150,138,0,138,150,138,138,138,150,138,0,138,150,137]}]},{osc1_oct:7,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:187,osc1_waveform:2,osc2_oct:5,osc2_det:0,osc2_detune:2,osc2_xenv:1,osc2_vol:161,osc2_waveform:2,noise_fader:0,env_attack:100,env_sustain:1818,env_release:2727,env_master:123,fx_filter:1,fx_freq:1900,fx_resonance:162,fx_delay_time:2,fx_delay_amt:153,fx_pan_freq:6,fx_pan_amt:61,lfo_osc1_freq:0,lfo_fx_freq:1,lfo_freq:2,lfo_amt:196,lfo_waveform:3,p:[0,0,0,0,0,0,0,0,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,2],c:[{n:[135,135,138,135,142,135,140,138,135,135,138,135,142,135,140,138,135,135,138,135,142,135,140,138,135,135,138,135,142,135,140,138]},{n:[143,143,155,143,0,143,155,143,143,143,150,143,147,143,140,143,138,138,143,138,143,140,138,140,138,138,143,138,142,140,138,140]}]},{osc1_oct:8,osc1_det:0,osc1_detune:0,osc1_xenv:1,osc1_vol:192,osc1_waveform:0,osc2_oct:7,osc2_det:0,osc2_detune:0,osc2_xenv:1,osc2_vol:70,osc2_waveform:2,noise_fader:8,env_attack:100,env_sustain:0,env_release:9090,env_master:164,fx_filter:2,fx_freq:5500,fx_resonance:240,fx_delay_time:6,fx_delay_amt:51,fx_pan_freq:3,fx_pan_amt:66,lfo_osc1_freq:0,lfo_fx_freq:0,lfo_freq:0,lfo_amt:0,lfo_waveform:0,p:[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1],c:[{n:[135,0,0,0,0,0,135,0,0,0,135,0,0,0,0,0,135,0,0,0,0,0,135,0,0,0,135,0,0,0,0,0]}]}],rowLen:6615,endPattern:41}}},function(){for(var r in h.fx={click:{count:4,params:[[2,,.06,,.61,.58,,.0092,-.0248,.0059,.9077,-1,-.855,,-1,,-.24,-.4599,.9991,-.647,-.5371,,-1,.33]]},hover:{count:4,params:[[2,.46,.01,.0058,,.29,,-.06,-.02,,,-.7,.5,,-1,,-.5125,-.2453,.4399,-.7,,.0058,-1,.51]]},select:{count:4,params:[[2,,.0138,,.86,.52,,.04,-.04,,,-1,,,-1,,-1,-.56,.63,-.4,.35,,-1,.16]]},move:{count:4,params:[[2,.18,.01,,.3702,.14,,-.0799,.26,.41,.67,-1,,,-1,,-.1999,-.3199,.46,-.0799,,,-1,.4]]},hit:{count:18,params:[[2,.16,.18,,,.4,,-.3199,-.4399,,,-1,,,-1,,-1,-1,.74,-1,,.54,-1,.55]]},explosion:{count:4,params:[[3,,.11,.81,.4543,.11,,-1,-1,,,.36,.21,.45,-.6599,,-.04,.72,.26,-.4399,,,-.64,.34]]},explosionBig:{count:4,params:[[3,,.87,,,.22,,,-.14,,,-1,,,-1,,.08,-.28,.44,-.3399,,,-1,.17]]},levelup:{count:1,params:[[3,.0061,.1462,.0048,.9138,.5027,,.065,,,.6737,.1527,,,-.9567,,.081,-.0307,.071,.0945,,2e-4,,.26]]},death:{count:1,params:[[0,1e-4,.7618,.1376,.81,.1,,.3358,3e-4,,,.3006,,,.048,.6803,-1,-.76,.9985,.6463,.3453,,-1,.27]]}},h.audio={sounds:{},references:[],mute:!1,play:function(t){if(!h.audio.mute){var e=h.audio.sounds[t];(e=1<e.length?h.audio.sounds[t][h.rand.range(0,e.length)]:h.audio.sounds[t][0]).pool[e.tick].play(),e.tick<e.count-1?e.tick++:e.tick=0}}},h.fx)h.fx.hasOwnProperty(r)&&(h.audio.sounds[r]=[],h.fx[r].params.forEach(function(t,e){h.audio.sounds[r].push({tick:0,count:h.fx[r].count,pool:[]});for(var i=0;i<h.fx[r].count;i++){var o=new Audio;"undefined"!=typeof jsfxr&&(o.src=jsfxr(t)),h.audio.references.push(o),h.audio.sounds[r][e].pool.push(o)}}))}(),h.entity=function(t){this.x=t.x||0,this.y=t.y||0,this.w=t.w||0,this.h=t.h||0,this.col=t.col||0,this.name=t.name||"",this.removed=!1,this.sprite=h.sprite.create(this.name,this.w,this.h,function(t){t.fillStyle=this.col,t.fillRect(0,0,this.w,this.h)}.bind(this))},h.entity.prototype.destroy=function(){this.removed=!0},h.entity.prototype.draw=function(){h.ctx.translate(this.x,this.y),this.rotate&&h.ctx.rotate(this.rotate*h.RAD),h.ctx.drawImage(this.sprite,-this.w/2,-this.h/2,this.w,this.h)},h.particle=function(t){h.entity.apply(this,arguments),this.dir=h.rand.bool()?-1:1,this.vx=5*Math.random()-2,this.vy=-10*Math.random()-1,this.move=t.speed+h.rand.rangef(-.5,.5),this.distance=0,this.maxDistance=(t.dist||200)+h.rand.range(-30,30),this.delta=this.w/this.maxDistance},h.particle.prototype=Object.create(h.entity.prototype),h.particle.prototype.constructor=h.particle,h.particle.prototype.update=function(){this.w-=this.delta,this.h-=this.delta,this.vy+=h.gravity,this.y+=this.vy,this.x+=this.vx,this.distance+=Math.sqrt(Math.pow(this.vx,2)+Math.pow(this.vy,2)),this.distance>this.maxDistance&&(this.distance=this.maxDistance,this.destroy())},h.particle.prototype.draw=function(){h.ctx.save(),h.ctx.globalAlpha=1-this.distance/this.maxDistance,h.entity.prototype.draw.call(this),h.ctx.restore()},h.explosion=function(t){h.entity.apply(this,arguments),this.distance=0,this.rotate=h.rand.range(0,360),this.rot=t.rot||h.rand.range(-5,5),this.delta=t.delta||.1,this.maxDistance=h.rand.range(8*this.delta,15*this.delta)},h.explosion.prototype=Object.create(h.entity.prototype),h.explosion.prototype.constructor=h.explosion,h.explosion.prototype.update=function(){this.distance+=this.delta,this.w+=this.delta,this.h+=this.delta,this.rotate+=this.rot,this.distance>this.maxDistance&&(this.distance=this.maxDistance,this.destroy())},h.explosion.prototype.draw=function(){h.ctx.save(),h.ctx.globalAlpha=1-this.distance/this.maxDistance,h.entity.prototype.draw.call(this),h.ctx.restore()},h.bullet=function(t){this.column=t.column,this.type=t.type,this.speed=5,this.width=h.brickWidth,this.height=h.brickHeight,this.x=this.column*this.width+h.gap*(this.column+1),this.y=h.stage.height-h.brickWidth,this.hw=this.width/2,this.hh=this.height/2,this.rad=1,this.removed=!1,this.power=100,this.sprite=h.sprite.get(this.type+"-SHOT")},h.bullet.prototype.destroy=function(){Array.prototype.push.apply(h.explosions,[new h.explosion({name:"explosion#ffffff",x:this.x+this.hw,y:this.y,w:this.power/4,h:this.power/4,col:"#ffffff",delta:2,rot:0}),new h.explosion({name:"explosion#ed8500",x:this.x+this.hw,y:this.y,w:this.power/7,h:this.power/7,col:"#ed8500",delta:1.5,rot:-5}),new h.explosion({name:"explosion#ffff00",x:this.x+this.hw,y:this.y,w:this.power/8,h:this.power/8,col:"#ffff00",delta:1,rot:4})]),this.removed=!0},h.bullet.prototype.update=function(){this.y-=this.speed*h.timer.delta,h.arr.loop(h.bricks[this.column],function(t,e){null!==t&&t.y>this.y-h.brickHeight&&(this.power=h.elements[this.type].against[t.type],this.type===t.type&&(h.rumble.level=1),t.hit(this.power,this.type),this.destroy())},this)},h.bullet.prototype.draw=function(){h.ctx.save(),h.ctx.translate(this.x,this.y),h.ctx.drawImage(this.sprite,0,0),h.ctx.restore()},h.tower=function(t){this.type=t.type,this.w=h.brickWidth,this.h=h.brickWidth,this.setColumn(t.column),this.y=h.stage.height-this.h,this.col=h.elements[this.type].color,this.hw=this.w/2,this.hh=this.h/2,this.rad=Math.round(this.w/10),this.removed=!1,this.sprite=h.sprite.get(this.type),this.shootDelay=this.latency=h.elements[this.type].latency},h.tower.prototype.setColumn=function(t){this.column=t,this.x=this.column*this.w+h.gap*(this.column+1)},h.tower.prototype.destroy=function(){this.removed=!0;var t,e,i=this.w/6,o=this.h/6;for(h.rumble.level=10,t=1;t<6;t++)for(e=1;e<6;e++)h.particles.push(new h.particle({name:"particle"+this.col,x:this.x+t*i,y:this.y+e*o,w:i,h:o,col:this.col,speed:h.rand.range(1,5),dist:100*h.rand.range(3,5)}));h.audio.play("explosion")},h.tower.prototype.shoot=function(){0!==h.s&&h.bullets.push(new h.bullet({column:this.column,type:this.type}))},h.tower.prototype.update=function(){this.shootDelay-=h.timer.delta,this.shootDelay<0&&(this.shoot(),this.shootDelay=this.latency)},h.tower.prototype.draw=function(){h.ctx.save(),h.ctx.translate(this.x,this.y),h.ctx.drawImage(this.sprite,0,0),h.ctx.restore()},h.brick=function(t){if(this.column=t.column,this.type=t.type,this.w=h.brickWidth,this.h=h.brickHeight,this.x=this.column*this.w+h.gap*(this.column+1),this.y=-this.h,this.hw=this.w/2,this.hh=this.h/2,this.rad=Math.round(this.w/10),this.removed=!1,this.col=h.elements[this.type].color,this.add=0,this.explode=h.noop,this.sprite=h.sprite.get(this.type+"-BRICK-"+t.item),this.val=this.energy=h.elements[this.type].bricks[t.item].energy,"special"===t.item)switch(t.type){case"FIRE":this.explode=function(){h.rumble.level=10,h.arr.loop(h.bricks[this.column],function(t,e){t&&!t.removed&&(t.hitType=t.type,t.destroy())}),h.audio.play("explosionBig")};break;case"EARTH":this.explode=function(){h.rumble.level=10;for(var t=0,e=h.columns;t<e;t+=1)h.arr.loop(h.bricks[t],function(t,e){t&&!t.removed&&t.row>=this.row-1&&t.row<=this.row+1&&t.column>=this.column-1&&t.column<=this.column+1&&(t.hitType=t.type,t.destroy())},this);h.audio.play("explosionBig")};break;case"WATER":this.explode=function(){h.rumble.level=10;for(var t=0,e=h.columns;t<e;t+=1)t!==this.column&&h.arr.loop(h.bricks[t],function(t,e){t&&!t.removed&&t.row===this.row&&(t.hitType=t.type,t.destroy())},this);h.audio.play("explosionBig")};break;case"AIR":this.explode=function(){h.rumble.level=10;for(var t=0,e=h.columns;t<e;t+=1)h.arr.loop(h.bricks[t],function(t,e){t&&!t.removed&&t.type===this.type&&(t.hitType=t.type,t.destroy())},this);h.audio.play("explosionBig")}}},h.brick.prototype.destroy=function(t){this.removed=!0,this.type===this.hitType&&(this.explode(),h.flash=8),h.rumble.level=5;for(var e=0;e<10;e+=1)h.particles.push(new h.particle({name:"particle"+this.col,x:this.x+this.w/2,y:this.y+this.h,w:this.w/12,h:this.h/6,col:this.col,speed:h.rand.range(1,5),dist:100*h.rand.range(3,5)}));t||h.countScore(this.val),h.audio.play("explosion")},h.brick.prototype.hit=function(t,e){this.hitType=e,this.energy-=t,this.energy<=0&&!this.removed&&this.destroy(),h.audio.play("hit")},h.brick.prototype.update=function(){this.y+=h.timer.move+this.add,0===this.add?0!==h.s&&this.y>h.stage.height-this.h-h.brickWidth&&h.over():this.add-=h.gravity},h.brick.prototype.draw=function(){h.ctx.save(),h.ctx.translate(this.x,this.y),h.ctx.drawImage(this.sprite,0,0),h.ctx.restore()},h.star=function(t){this.x=h.rand.flot()*h.bgCtx.canvas.width,this.y=h.rand.flot()*h.bgCtx.canvas.height,this.brightness=15*t+h.rand.range(14*t,18*t)/100,this.radius=h.rand.flot()/t*4,this.color=h.starColors[h.rand.range(0,h.starColors.length)],this.draw()},h.star.prototype.draw=function(){h.bgCtx.save(),h.bgCtx.beginPath(),h.bgCtx.globalAlpha=this.brightness,h.bgCtx.fillStyle=this.color,h.bgCtx.arc(this.x,this.y,this.radius,0,h.PI2),h.bgCtx.fill(),h.bgCtx.closePath(),h.bgCtx.restore()},h.obj.extend(!0,h,{timer:{date:new Date,curr:null,timestamp:Date.now(),delta:1,msec:0,move:0,t:1e3/60,tick:function(){h.timer.curr=Date.now(),h.timer.d=h.timer.curr-h.timer.timestamp,h.timer.delta=h.timer.d/h.timer.t,h.timer.delta=h.timer.delta<0?.001:h.timer.delta,h.timer.delta=10<h.timer.delta?10:h.timer.delta,h.timer.msec+=h.timer.delta,h.timer.timestamp=h.timer.curr,h.timer.move=h.s*h.timer.delta}},emitter:{sum:0,row:0,emit:function(){if(h.emitter.sum>h.brickHeight+h.gap||0===h.emitter.sum){for(var t,e,i,o=h.emitter.sum=0,r=h.columns;o<r;o+=1)e=h.rand.select(h.elementTypes),i=h.rand.select(Object.keys(h.elements[e].bricks)),(t=new h.brick({column:o,type:e,item:i})).row=h.emitter.row,h.bricks[o].unshift(t);h.emitter.row++,h.s+=.001}h.emitter.sum+=h.timer.move}},initBackground:function(){for(var t=0,e=h.bgs.length;t<e;t+=1){h.bgCtx.clearRect(0,0,h.bgCtx.canvas.width,h.bgCtx.canvas.height);for(var i=0,o=h.starAmount;i<o;i+=1)new h.star(h.bgs.length-t+1).draw();h.bgs[t].b.style.backgroundImage="url("+h.bg.toDataURL()+")"}},noBg:function(){h.moveBg=!h.moveBg},mute:function(){for(var t in h.audio.mute=!h.audio.mute,h.music.pool)h.music.pool.hasOwnProperty(t)&&h.music.pool[t].volume(h.audio.mute?0:.4)},menu:function(t){h.paused=!0,t&&h.bricks&&(h.re.style.display="block"),h.mnu.style.display="block",h.msg.style.display="none"},newgame:function(){h.bricks=h.arr.create(h.columns),h.towers=[],h.bullets=[],h.particles=[],h.explosions=[],h.activeColumn=null,h.hoverColumn=null;var i=h.elementTypes.concat(h.arr.create(h.columns-4,0)).sort(function(){return.5-Math.random()});h.arr.loop(i,function(t,e){h.towers[e]=!!i[e]&&new h.tower({column:e,type:i[e]})}),h.score=0,h.s=h.speed,h.countScore(0),h.paused=!1,h.msg.style.display="none"},over:function(){var e=600;h.s=0,h.message("GAME OVER",0,"MAIN MENU"),h.audio.play("death"),h.towers.forEach(function(t,e){setTimeout(function(){t&&t.x&&t.destroy()},100*e)}),h.bricks.forEach(function(t){setTimeout(function(){t.forEach(function(t){t&&!t.removed&&(t.add=-.001)})},e),e+=100})},pause:function(){h.paused?(h.paused=!1,h.message()):(h.paused=!0,h.message("PAUSE"))},help:function(){if(!h.buildHelp){for(var t in h.elements)if(h.elements.hasOwnProperty(t)){var e=t,i=h.elements[t],o=h.dom.create("div"),r=h.dom.create("h2"),n=h.dom.create("p"),s=h.dom.create("p");r.innerHTML=e+"<br />",n.innerHTML=i.desc,s.innerHTML=i.spec,o.appendChild(r),n.insertBefore(h.sprite.get(e),n.firstChild),o.appendChild(n),s.insertBefore(h.sprite.get(e+"-BRICK-special"),s.firstChild),o.appendChild(s),h.hlp.appendChild(o)}h.buildHelp=!0}h.message(h.hlp,0,"MAIN MENU")},message:function(t,e,i){var o,r=h.msg.style;h.mnu.style.display="none",t?("object"==typeof t?(h.msg.innerHTML="",t.style.display="block",h.msg.appendChild(t)):h.msg.innerHTML=t,i&&((o=h.dom.create("em")).innerHTML=i,h.msg.appendChild(o)),r.opacity=0,r.display="block",r.marginTop=-h.msg.offsetHeight/2+"px",r.opacity=1):r.display="none",e&&setTimeout(function(){r.display="none"},e)},credits:function(){h.message(h.crd,0,"MAIN MENU")},controls:function(){window.addEventListener("keyup",function(t){switch(t.keyCode){case 27:h.menu(!0);break;case 80:h.pause();break;case 77:h.mute();break;case 66:h.noBg()}},!1),h.ng.addEventListener("click",function(){h.newgame(),h.audio.play("click"),h.mnu.style.display="none"},!1),h.hl.addEventListener("click",function(){h.help(),h.audio.play("click")},!1),h.re.addEventListener("click",function(){h.pause()},!1),["hlp","msg","crd"].forEach(function(t){h[t].addEventListener("click",function(){h.menu()},!1)}),h.cr.addEventListener("click",function(){h.credits(),h.audio.play("click")},!1),["ng","hl","cr","re"].forEach(function(t){h[t].addEventListener("mouseover",function(){h.audio.play("hover")},!1)}),h.cnt.addEventListener("mousemove",function(t){if(!h.paused&&0<h.s){var e=t.pageX-this.offsetLeft,i=Math.floor(e/(h.brickWidth+h.gap+h.gap/h.columns));h.hoverColumn=i}else h.hoverColumn=null},!1),h.cnt.addEventListener("click",function(t){if(!h.paused&&0<h.s){var e=t.pageX-this.offsetLeft,i=Math.floor(e/(h.brickWidth+h.gap+h.gap/h.columns));h.towers[i]&&!h.towers[i].removed?null===h.activeColumn?(h.activeColumn=i,h.audio.play("select")):(h.towers[h.activeColumn].setColumn(i),h.towers[i].setColumn(h.activeColumn),h.arr.move(h.towers,h.activeColumn,i),h.activeColumn=null,h.audio.play("move")):(null!==h.activeColumn&&(h.towers[h.activeColumn].setColumn(i),h.arr.move(h.towers,h.activeColumn,i),h.audio.play("move")),h.activeColumn=null)}else h.activeColumn=null},!1)},stats:function(){var t;"function"==typeof Stats?((t=new Stats).setMode(0),t.domElement.style.position="absolute",t.domElement.style.left="0px",t.domElement.style.top="0px",document.body.appendChild(t.domElement),h.stats=t):h.stats={begin:h.noop,end:h.noop}},countScore:function(t){h.score+=t,h.level=Math.ceil(h.s/.12),h.hud.score.innerHTML=h.score,h.hud.level.innerHTML=h.level,h.level>h.prevLevel&&(h.prevLevel=h.level,h.message("LEVEL UP",2e3),h.audio.play("levelup"))},update:function(){h.arr.loop(h.bricks,function(i,t){h.arr.loop(i,function(t,e){t&&(t.removed?i.splice(e,1):t.update())})}),h.arr.loop([h.towers,h.bullets,h.particles,h.explosions],function(i){h.arr.loop(i,function(t,e){t&&(t.removed?i.splice(e,1):t.update())})}),h.rumble.update()},updateBackground:function(){if(h.moveBg)for(var t=0,e=h.bgs.length;t<e;t+=1)h.bgs[t].c+=t+1,h.bgs[t].b.style.backgroundPosition="0px "+h.bgs[t].c/3+"px"},rumble:{update:function(){0<h.rumble.level?(h.rumble.level-=h.rumble.decay,h.rumble.level=h.rumble.level<0?0:h.rumble.level,h.rumble.x=h.rand.rangef(-h.rumble.level,h.rumble.level),h.rumble.y=h.rand.rangef(-h.rumble.level,h.rumble.level)):(h.rumble.x=0,h.rumble.y=0)},draw:function(){0===h.rumble.x&&0===h.rumble.y||(h.stage.style[h.transformName]="translate("+h.rumble.x+"px,"+h.rumble.y+"px)")}},draw:function(){h.ctx.save(),h.ctx.clearRect(0,0,h.ctx.canvas.width,h.ctx.canvas.height),h.arr.loop(h.bricks,function(t){h.arr.loop(t,function(t){t&&!t.removed&&t.draw()})}),h.arr.loop([h.towers,h.bullets,h.particles,h.explosions],function(t){h.arr.loop(t,function(t){t&&!t.removed&&t.draw()})}),h.drawFlash(),h.rumble.draw(),h.drawSelection()},drawSelection:function(){var t,e;if(null!==h.activeColumn&&(t=h.towers[h.activeColumn])&&t.x&&(h.ctx.save(),h.ctx.translate(t.x,0),h.ctx.lineWidth=2,h.ctx.fillStyle=h.elements[t.type].color,h.ctx.globalAlpha=.2,h.ctx.fillRect(0,0,h.brickWidth,h.stage.height),h.ctx.restore()),null!==h.hoverColumn){t=h.towers[h.activeColumn];var i="#ffffff";(e=h.towers[h.hoverColumn])&&e.x&&(i=h.elements[e.type].color),t&&t.x&&(i=h.elements[t.type].color),h.ctx.save(),h.ctx.translate(h.gap+h.hoverColumn*(h.brickWidth+h.gap),0),h.ctx.lineWidth=2,h.ctx.fillStyle=i,h.ctx.globalAlpha=.2,h.ctx.fillRect(0,0,h.brickWidth,h.stage.height),h.ctx.restore()}},drawFlash:function(){0<h.flash&&(h.flash--,h.f.style.opacity=h.flash/10)},init:function(){h.music.generate("main",function(t){t.loop=!0,t.volume(.4),t.start()}),h.obj.extend(!0,h,{ww:window.innerWidth,wh:window.innerHeight,rumble:{body:h.dom.get("r")},hud:{level:h.dom.get("lv"),score:h.dom.get("sc")},cnt:h.dom.get("cnt"),msg:h.dom.get("msg"),mnu:h.dom.get("mnu"),hlp:h.dom.get("hlp"),crd:h.dom.get("crd"),re:h.dom.get("re"),ng:h.dom.get("ng"),hl:h.dom.get("hl"),cr:h.dom.get("cr"),f:h.dom.get("f"),stage:h.dom.get("c"),bg:h.dom.get("b"),bgs:[{b:h.dom.get("b1"),c:0},{b:h.dom.get("b2"),c:0},{b:h.dom.get("b3"),c:0}]}),h.stage.width=h.wh/2,h.stage.height=h.wh-30,h.cnt.style.width=h.stage.width+"px",h.cnt.style.height=h.wh+"px",h.bg.width=h.ww,h.bg.height=h.wh,h.brickWidth=h.stage.width/h.columns-h.gap-h.gap/h.columns,h.brickHeight=h.brickWidth/2+h.gap,h.obj.extend(!0,h,{ctx:h.stage.getContext("2d"),bgCtx:h.bg.getContext("2d"),elementTypes:Object.keys(h.elements),transformName:h.vendor.get("transform"),prevLevel:0,score:0,flash:0,paused:!0});for(var t=0;t<3;t++)h.bgs[t].width=h.ww,h.bgs[t].height=h.wh;h.sprite.factory(),h.initBackground(),h.controls(),h.stats(),h.menu()}}),h.init(),function t(){requestAnimationFrame(t,h.stage.canvas),h.timer.tick(),h.stats.begin(),h.updateBackground(),h.paused||(h.emitter.emit(),h.update(),h.draw()),h.stats.end()}()}();