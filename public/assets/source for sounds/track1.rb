live_loop :Vinylhiss do
  with_fx :flanger, depth: 2 do
    sample :vinyl_hiss
    sleep sample_duration :vinyl_hiss
  end
end
use_synth :mod_fm
live_loop :main do
  2.times do
    2.times do
      with_fx :slicer do
        play 50, amp: 0.5
        sleep 0.25
        play 48, amp: 0.5
        sleep 0.25
      end
    end
    
    sleep 0.5
  end
  2.times do
    play 50, amp: 0.5
    sleep 0.25
    play 52, amp: 0.5
    sleep 0.25
  end
end
sleep 8


live_loop :beat do
  with_fx :reverb do
    with_fx :echo do
      with_fx :slicer do
        sample :drum_bass_hard
        sleep 1.5
        sample :drum_bass_hard
        sleep 2.5
      end
    end
  end
end

sleep 6


use_bpm 60

live_loop :drums2 do
  with_synth :mod_fm do
    9.times do
      sample :drum_heavy_kick
      sleep 0.5
      sample :drum_heavy_kick
      sleep 0.5
    end
    1.times do
      sample :drum_heavy_kick
      sleep 0.5
      sample :drum_heavy_kick
      sleep 0.25
      sample :drum_heavy_kick
      sleep 0.25
    end
  end
end

sleep 8
use_bpm 120
live_loop :part2 do
  8.times do
    with_synth :mod_fm do
      2.times do
        play 60
        sleep 1.5
      end
      play 60
      sleep 1
      2.times do
        play 58
        sleep 1.5
      end
      play 58
      sleep 1
    end
  end
  sample :ambi_choir, rate: 0.8
  stop
end

sleep 16

1.times do #part 3
  with_fx :bitcrusher, bits: 7, sample_rate: 9000 do
    3.times do
      with_fx :reverb do
        use_bpm 30
        with_synth :fm do
          play 68, amp: 0.5
        end
        sleep 1.5
        use_bpm 60
        with_synth :fm do
          play 64, amp: 0.5
          sleep 0.25
          play 65, amp: 0.5
          sleep 0.5
          play 64, amp: 0.5
          sleep 0.25
          play 63, amp: 0.5
          sleep 0.5
        end
        sleep 3.5
      end
    end
    1.times do
      use_synth :hollow
      with_fx :reverb do
        use_bpm 30
        play 68, amp: 1
        
        sleep 1.5
        use_bpm 60
        play 64, amp: 1
        sleep 0.25
        play 65, amp: 1
        sleep 0.5
        play 64, amp: 1
        sleep 0.25
        play 63, amp: 1, sustain: 1, release: 1, decay: 3 , decay_level: 1
        sleep 0.5
      end
    end
  end
  live_loop :main do
    stop
  end
  sleep 3
end

live_loop :part4 do
  use_synth :fm
  use_bpm 60
  1.times do
    8.times do
      play 40
      sleep 1
    end
    2.times do
      play 40
      sleep 1
      play 45
      sleep 1
      play 42
      sleep 1
      play 44
      sleep 1
    end
  end
  live_loop :Vinylhiss do
    stop
  end
  1.times do #part 3
    with_fx :bitcrusher, bits: 7, sample_rate: 9000 do
      1.times do
        use_synth :hollow
        with_fx :reverb do
          use_bpm 30
          play 68, amp: 1
          
          sleep 1.5
          use_bpm 60
          play 64, amp: 1
          sleep 0.25
          play 65, amp: 1
          sleep 0.5
          play 64, amp: 1
          sleep 0.25
          play 63, amp: 1, decay: 3 , decay_level: 1
          sleep 0.5
        end
      end
    end
    sleep 3
    stop
  end
end

use_bpm 60
sleep 4
live_loop :beat do
  stop
end

sleep 4
live_loop :drums2 do
  stop
end