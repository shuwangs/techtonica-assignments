/*

An anagram is a word formed by rearranging the letters of a different word using all the original 
letters exactly once. The function is given two strings: s - to search in, p - a template word. 
Find the starting indexes of anagrams of p among substrings of the given s.

Examples ==> function (s, p)
findAnagrams("cbaebabacd", "abc") ➞ [0, 6]
// Anagrams: "cba", bac"

findAnagrams("abab", "ab") ➞ [0, 1, 2]
// Anagrams: "ab", "ba", "ab"

p  = "ab"; => ab, ba

//INPUT: 
two strings: S    P 
OUTPUT: 

ASSumptions:
- the first parameters is word to search through
- second is the anagram



Pseudocode
1. check the pattern each counts shows  {
2. Check the length of P and S

*/
function findAnagrams(target_str, pattern) {
    if (pattern.length > target_str.length) {
        return [];
    }
    const pattern_dict = {}
    for (let i = 0; i < pattern.length; i++ ){
        if (pattern[i] in pattern_dict) {
            pattern_dict[pattern[i]] += 1;
        } else {
            pattern_dict[pattern[i]] = 0;
        }
    }
    console.log(pattern_dict)


}
// console.log(findAnagrams("cbaebabacd", "abc"));// [0, 6];
// console.log(findAnagrams("abab", "ab")); // [0, 1, 2];
// console.log(findAnagrams('a', 'ab')); // [];
console.log(findAnagrams("racecar", "ace")); // [ 1, 3 ]