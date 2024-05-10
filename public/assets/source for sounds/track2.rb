use_synth :fm
x = 0
y = 0
z = 0
live_loop :part1, amp: 0.5 do
  with_fx :echo do
    with_fx :echo do
      play 50
      sleep 2
      play 58
      sleep 2
      play 60
      sleep 2
      play 58
      sleep 1
      play 57
      sleep 1
      z = 0
    end
  end
end
sleep 8
live_loop :Kick do
  with_fx :bitcrusher, bits: 5, amp: 0.5 do
    sample :drum_heavy_kick
    sleep 2
    sample :drum_heavy_kick
    sleep 1
    sample :drum_heavy_kick
    sleep 1
    sample :drum_heavy_kick
    sleep 2
    sample :drum_heavy_kick
    sleep 1
    sample :drum_heavy_kick
    sleep 0.5
    sample :drum_heavy_kick
    sleep 0.5
    sample :drum_heavy_kick
  end
end
sleep 8
live_loop :Hollowedns do
  use_synth :hollow
  if z == 0 then
    2.times do
      play 70, sustain: 1
      sleep 2
      play 68, sustain: 1
      sleep 2
      play 69, sustain: 0.5
      sleep 1
      play 67, sustain: 0.5
      sleep 1
      play 68, sustain: 0.5
      sleep 1
      play 65, sustain: 1
      sleep 1
    end
  end
  z +=1
  if z >= 1 then
    sleep 8
    z = 1
  end
  
end

sleep 16
live_loop :part1 do
  stop
end
live_loop :holloweds do
  use_synth :hollow
  with_fx :slicer do
    play 70, sustain: 1
    sleep 2
    play 68, sustain: 1
    sleep 2
    play 69, sustain: 0.5
    sleep 1
    play 67, sustain: 0.5
    sleep 1
    play 68, sustain: 0.5
    sleep 1
    play 65, sustain: 1
    sleep 1
  end
  sleep 8
  stop
end
sleep 8
live_loop :Kick do
  stop
end
live_loop :Kick2 do
  with_fx :bitcrusher, bits: 5, amp: 0.5 do
    sample :drum_heavy_kick
    sleep 1
    sample :drum_heavy_kick
    sleep 1
    sample :drum_heavy_kick
    sleep 2
    sample :drum_heavy_kick
    sleep 2
    sample :drum_heavy_kick
    sleep 1
    sample :drum_heavy_kick
    sleep 0.5
    sample :drum_heavy_kick
    sleep 0.25
    sample :drum_heavy_kick
    sleep 0.25
    sample :drum_heavy_kick
  end
end
live_loop :LOL do
  sample :ambi_drone, rate: -120, pan: x
  sleep 1
  sample :ambi_drone, rate: -120, pan: x
  sleep 1
end
sleep 8
use_synth :fm
live_loop :part2, amp: 0.5 do
  with_fx :echo do
    with_fx :echo do
      play 55
      sleep 2
      play 59
      sleep 2
      play 57
      sleep 1
      play 58
      sleep 1
      play 57
      sleep 1
      play 52
      sleep 0.5
      play 53
      sleep 0.5
    end
  end
end
sleep 8
use_synth :dpulse
live_loop :pian0 do
  with_fx :slicer, amp: 0.5 do
    with_fx :bitcrusher, bits: 4 do
      if y == 0 then
        play 70, attack: 1, attack_level: 1
        sleep 2
        3.times do
          play ring(64,55,60).tick
          sleep 2
        end
        y+=1
      end
      if y == 1 then
        4.times do
          play ring(70,64,55,60).tick
          sleep 1
        end
        y+=1
      end
      if y == 2 then
        1.times do
          play 70
          sleep 0.4
          play 70
          sleep 0.6
          play 64
          sleep 0.4
          play 64
          sleep 0.6
          play 55
          sleep 1
          play 60
          sleep 1
          y += 1
        end
      end
      if y == 3 then
        4.times do
          play ring(60,70,55,64).tick
          sleep 1
        end
        y+=1
      end
      if y == 4 then
        play 40
        sleep 0.5
        play 50
        sleep 0.5
        play 35
        sleep 0.5
        play 44
        sleep 0.5
        play 55
        sleep 1
        play 65
        sleep 1
        y+=1
        z = 0
      end
      if y == 5 then
        8.times do
          play ring(60,70,55,64,70,68,70,65).tick
          sleep 1
        end
        y+=1
      end
      if y == 6 then
        live_loop :part2 do
          stop
        end
      end
      sleep 8
      y+=1
      if y == 7 then
        live_loop :Kick2 do
          stop
        end
      end
      sleep 8
      y+=1
      if y == 8 then
        live_loop :LOL do
          stop
        end
      end
      sleep 8
      y+=1
      if y == 9 then
        live_loop :pian0 do
          stop
        end
      end
    end
  end
  
  loop do
    if x == 0 then
      x-= 0.5
    end
    sleep 1
    if x == -0.5 then
      x+=0.5
    end
    sleep 1
    if x == 0 then
      x += 0.5
    end
    sleep 1
    if x == 0.5 then
      x -= 0.5
    end
    sleep 1
  end
end