export const LENGTH=3600;
export const tracks=Array.from({length:5},(_,i)=>Array.from({length:13+i*2},(_,j)=>({x:300+j*(245-i*8),lane:(j*3+i)%4,type:j%5===3?'cool':j%5===4?'mud':'ramp',size: j%3===0?2:1})));
export function createGame(track=0,rivals=false){return {track,rivals,phase:'ready',lap:1,time:0,x:0,lane:1,speed:0,heat:0,height:0,vy:0,pitch:0,crash:0,overheat:0,hit:-1,opponents:Array.from({length:4},(_,i)=>({x:450+i*550,lane:(i+2)%4,speed:85+i*8})),message:'',messageTime:0};}
export function start(g){g.phase='racing';}
export function step(g,keys,dt){if(g.phase!=='racing')return;dt=Math.min(dt,.05);g.time+=dt;if(g.messageTime>0)g.messageTime-=dt;
 if(g.crash>0||g.overheat>0){if(g.crash>0)g.crash=Math.max(0,g.crash-dt);else {g.overheat=Math.max(0,g.overheat-dt);g.heat=Math.max(0,g.heat-45*dt)}g.speed=0;return;}
 const turbo=!!keys.turbo, gas=!!keys.gas||turbo;g.speed=Math.max(0,Math.min(turbo?195:145,g.speed+(gas?100:-110)*dt));g.heat=Math.max(0,Math.min(100,g.heat+(turbo?20:-10)*dt));if(g.heat>=100){g.overheat=2.5;g.message='OVERHEATED!';g.messageTime=2;return;}
 if(keys.up)g.lane=Math.max(0,g.lane-2.8*dt);if(keys.down)g.lane=Math.min(3,g.lane+2.8*dt);
 if(keys.left)g.pitch=Math.max(-.65,g.pitch-1.4*dt);else if(keys.right)g.pitch=Math.min(.65,g.pitch+1.4*dt);else g.pitch*=Math.max(0,1-1.6*dt);
 let old=g.x;g.x+=g.speed*dt;if(g.height>0||g.vy>0){g.vy-=180*dt;g.vy+=(g.pitch<0?18:-12)*dt;g.height+=g.vy*dt;if(g.height<=0){g.height=0;g.vy=0;if(Math.abs(g.pitch)>.38){g.crash=1.8;g.speed=0;g.message='BAD LANDING!';g.messageTime=1.5}else {g.speed=Math.min(195,g.speed+8);g.message='NICE LANDING';g.messageTime=.8}g.pitch=0;}}
 // Match the renderer's two obstacle copies, including layouts that extend past a lap.
 for(let lap=0;lap<2;lap++) tracks[g.track].forEach(o=>{const x=o.x+lap*LENGTH;if(Math.abs(g.lane-o.lane)>.65||g.height>10)return;if(o.type==='cool'&&g.x>=x&&g.x<x+100)g.heat=Math.max(0,g.heat-55*dt);if(o.type==='mud'&&g.x>=x&&g.x<x+110)g.speed=Math.max(35,g.speed-100*dt);if(o.type==='ramp'&&old<x&&g.x>=x&&g.speed>55){g.vy=65+o.size*15+g.speed*.1;g.height=.01;g.pitch=-.18;}});
 if(g.rivals)for(const o of g.opponents){o.x+=o.speed*dt;if(o.x>g.lap*LENGTH+500)o.x-=LENGTH;if(Math.abs(g.x-o.x)<25&&Math.abs(g.lane-o.lane)<.48&&g.height<18){g.crash=1.8;g.speed=0;o.x+=55;g.message='COLLISION!';g.messageTime=1.5;}}
 if(g.x>=g.lap*LENGTH){if(g.lap===2){g.phase='finished';g.message=g.time<75+g.track*3?'QUALIFIED!':'TRY AGAIN';}else {g.lap=2;g.message='LAP 2 / 2';g.messageTime=2;}}
}
