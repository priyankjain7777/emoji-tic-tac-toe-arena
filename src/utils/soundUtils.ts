
// Utility function to create a click sound using the Web Audio API
export const createClickSound = (): HTMLAudioElement => {
  // Create an in-memory audio element
  const audio = new Audio();
  audio.volume = 0.5;
  
  try {
    // Try to use the Audio Context API to generate a click sound
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    
    if (AudioContext) {
      const audioCtx = new AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
      
      // Create a click sound as a data URI
      const clickSound = `data:audio/wav;base64,UklGRnQGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YVAGAACBhYqFbF1fdJivrJBkNjVgodDh0JdcMThqsd/s1IxVOFB/vN/fpnNCVIm10Lq6iU1HcaC4vaijdElZjcDk3bWGVUVhh6zEz8GYXD9McrHc6cF8RUBdhLjj6oyAWEU2aMfm6Jp0SzF4qsbz16yLZmJic5y/w7ywhWVgdZavvMfRwJ+Ng4mRlJGHfHN3iJmkqKOZjoJ+gIOMlZeXlY+KiIaEhIWHioySl5eUkI2LioiFfoWQmp2bl5OQkZKUkY+OjIuLjI2Oj5CSkpKTkpGPkJCQkI+OjY6Ojo6Pj5CQkJGRkJCQkI+Pj4+QkJCQkI+Pj5CQkJCQkI+Pj4+QkJCPj5CQkZCPj46Oj4+Pj4+Pjo6Oj4+QkJCQkJCPj4+PkJCQkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkI+Pj4+QkJCQkI+Pj4+Pj5CQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+Pj5CQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+QkJCQkI+Pj5CQkJCQj4+Pj5CQkJCQj4+Pj5CQkJCQj4+Pj5CQkJCQj4+Pj5CQkJCQj4+Pj5CQkJCQj4+Pj5CQkJCQj4+Pj5CQkJCQj4+Pj5CQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQj4+Pj5CQkJCQkI+Pj4+QkJCQkJCPj4+PkJCQkJCQkJCPj4+Pj4+QkJCQkJCQj4+Pj4+QkJCQkJCQkI+Pj4+QkJCQkJCQkI+Pj4+QkJCQkJCQkI+Pj4+QkJCQkJCQj4+Pj5CQkJCQkJCPj4+PkJCQkJCQkI+Pj4+QkJCQkJCQj4+Pj5CQkJCQkJCPj4+PkJCQkJCQkI+Pj4+QkJCQkJCQj4+Pj5CQkJCQkJCPj4+PkJCQkJCQkI+Pj4+QkJCQkJCQj4+Pj5CQkJCQkJCPj4+PkJCQkJCQkA==`;
      audio.src = clickSound;
      return audio;
    }
  } catch (e) {
    console.log("Web Audio API not supported, falling back to default sound");
  }
  
  // Fallback to a very simple click sound as data URI
  audio.src = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFj////////////////////////////////////////////////////////////////9MuZEAAAAAAAAAAAAAAAAMjAyIEJQTQAAAAAAAAAAABSAJAkVrkAAAAAAAAAAAAAAAAAAAP/jWMQACwQAGmBEABCBHi/JGsAGMDAAACCIMGEAwqBAQDCwy0BAIBAICsAwEGBAMQAfAwfAQMDARTjAogNCQJAIVGnGBLLjKLyhOJIFxkKGBgJMhCNPj5yw0GSIJeap5uyjhy84J5gcKpK0qGJTLGT/zGYbKA1wXTJ2kdC48aMZBXJpEn/4Z/4Yr//+dj///+98////hv/3//9/H////qn///44//////++yQAZgX/f///YZP/4WIAIMP////bBP//QLiEiYP/////0AIiKMcqL///////35V////8F//////i//////vl//////6n////4X////9T/////YQ//////+8LAwjP////b//////wAYBgX//+Yv///+vo8IP////cQ///+AqAhMe/////3ELDf//CQiPJ//////iJ///4LBg0v/////QS///4SLjR3////+4if//8IEBxP/////wUf//8NCRw6f////ulL//+uAAQoT//9E////dLm4eM////uAT///gIyEzNXVqAQeAI1v2kzBTF65L88uQIXA7JzIvQVQtPOE6cLcFpEDhKBgsdmKCg0NEgSRiIhAYmJ6ZuJ6dUaTTlBlDf/k03///Kkjqev////+Sqf/3//7v////n////b/////6P////P/////T///+p/////1f////c/////8b/////I/////iA/////6v////3H//f+G//9+C//9sxU/+1ku//RNVP/qmKn/0jFQAL///MQAAAAAAAC8f/OQwGDELDmXDQNhEX0//5CBYgVEBQsQRtC8OJH/jTP/kOFTAwNPLAsGAMMHL+HMu2dE///////////8vFwEHlPjxA6VHCQ1Hf/////////9+Wx2XjRRgqYqf/V/+ySqf9olU/+1v/0klU/+1q/9TMd/9f/9kmO/+0yn/1Mx3/0yr/2SY7/7XMf/U7Hf/X//U7Hf/X//Uzz//X//aTzP/r//t2a//9//9+an//f//cmqH/f//f0qf/9//98cp//3//4TE5iwFqhf//1dhkQVm9HT79MsCwcGCkXDI0S///zl6JiY3LnaSzJJknVVTV////+pw+cRnk5RGeUxXqLioyN5f/////LZ7FM5amSIMVEunqqv//////////+rzEjkdIlxXM+5DBYqcz////////69J5LOMyThwbMDxssMt////////r8vm8mmHi5scKj5UjaP////////63PZHKZrIYqLDJ1QyNqBY1NVJIN////////xUaGBUwAACwmJ1UoigRNuWmSpIsP////////vH/w4YFxgXGBQqFP/Kv//f//W//7//1Mcp////v///mJic/////2Jib////+o6N////+f9Scnf////e5OT/////fe5P////59U4uf////fouf////nd7l/////Pcv////53una////+e52v////nO1z/////N1z/////Odz/////N2uf////zudr////+c7X/////Odz/////Odz/////Odr////+c7X/////Odbn////9bkJQKzGnQf////zOyQN/////z+0OHv////83Nzk/////Mzc////+RucnP////kbnP////yE4Qf////8hP/////8nCH/////5CE/////yEJ/////+Qn/////5CE/////5Cf/////kLP////yE//+7/JN///3f5ND//93+TQ///d/k3///3//4AAP/jYMAAAAGn1D7lGDCgkYSJRhglOGCkAe3sMwMWIwGwMwUAU0dWZbvtnHBYsaFggoYKDQwgNEggwKrjAxCAkCDhFSS//5yUrREujbQpwpnQAoQxoWBC2Ncqf/////OBMqOGxY0lQVlQJpU/////9YKlCYVOiuZURkwVlT/////9kMqEwe8phUxBtP/////8iB0wVOV////9if//AKEH/////YR///xZ/////////+X//9sv/r//1//rX/7f//X/+qf+3//1//l7/t//9JT/+3//0//pT/skf/0v/6UqP+yR/9f/7JH/9f/+yR//X//ZI/7JH/r//aSP9r//1f/tr//3//4Hb/yd//9//93d/+zZ//9//98sv/Z////ff/+Tr//3//37yz/k7//9//98sv/Z////ff/+Tr//3//27L/2XP//ff/bsv/Zcv/ff/ZZH+y5f99/9lkf7Ll/33/2WR/suX/ff/ZZH+y5f99/9lkf7Ll/33/2WR/suX/ff/LLl/0XL/vv/lkf6Ll/33/yyP9Fy/77/5ZH+i5f99/8sj/Rcv++/+X5/ouX/f//L8/0XL/v//9+X5/n//3f//+/L8//+/+///vn8//7/9//v/+f//3/9//v/+f//3/9//v/+f5/n9///7/zf+//9l/9/+3//2f/3/7f/+z/+//b//2f/3/7f/+z/+//b//2f/3/7f/+z/+//b//2f/3/7f/+z/+//b//2f/3/7f/+z/+//b//2X/3/7f/+z/+//b//2X/3/7f/+z/+//b//2X/3/7f/+z/+//b//2X/3/7f/+z/+//b//2X/3/7f/+z/+//b//2X/3/7f/+z/+//b//2X/3/7f/+z/+//b//2X/3/7f/+y/+//b//2X/3/7f/+y/+//b//2X/3/7L/7/9v//Zf/f/sv/v/2//9l/9/+y/+//b//2X/3/7L/7/9v//Zf/f/sv/v/2//9l/9/+y/+//b//2X/3/7L/7/9v//Zf/f/sv/v/2//9l/9/+y/+//b//2Vn3/7L/7/9v//ZWd/+y/+//ZWff/sv/v/2Vn3/7L/7/9lZ9/+y/+//ZWff/sv/v/2VnX/8v/v/2VnX/8v/v/2VnX/8v/v/2VnX/8v/v/2VnX/8v/v/2VnX/8v/v/2Vnc//v/2Vnc//v/2Vn//91UxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
  
  return audio;
};
