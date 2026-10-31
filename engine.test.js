import {test} from 'node:test';import assert from 'node:assert/strict';import {createGame,start,step,LENGTH} from './engine.js';
const run=(g,k,n)=>{for(let i=0;i<n;i++)step(g,k,.05)};
test('throttle accelerates and releasing slows',()=>{let g=createGame();start(g);run(g,{gas:true},20);assert.ok(g.speed>90);run(g,{},20);assert.equal(g.speed,0)});
test('turbo overheats and temporarily stops',()=>{let g=createGame();start(g);run(g,{turbo:true},101);assert.ok(g.overheat>0);assert.equal(g.speed,0)});
test('cooling strip reduces heat',()=>{let g=createGame();start(g);g.x=1040;g.lane=1;g.heat=60;step(g,{gas:true},.05);assert.ok(g.heat<59)});
test('lane steering is bounded',()=>{let g=createGame();start(g);run(g,{up:true},100);assert.equal(g.lane,0);run(g,{down:true},100);assert.equal(g.lane,3)});
test('bad landing crashes; level landing continues',()=>{let g=createGame();start(g);g.height=1;g.vy=-40;g.pitch=.6;step(g,{right:true},.05);assert.ok(g.crash>0);g=createGame();start(g);g.height=1;g.vy=-40;step(g,{},.05);assert.equal(g.crash,0)});
test('two laps finish the race',()=>{let g=createGame();start(g);g.x=LENGTH-1;g.speed=100;step(g,{gas:true},.05);assert.equal(g.lap,2);g.x=2*LENGTH-1;step(g,{gas:true},.05);assert.equal(g.phase,'finished')});
