# Cracker

## What it is

This is a website that lets you input any Baconian, Vigenere, or Caesar cipher on the planet, and i'm confident that it can crack it within miliseconds. This is useful for encoding information that you might
 not want someone else other than the person you intended it for to see.

## How to use it

Just get your encoded text (we can call this the ciphertext), and put it in the box that says ciphertext. Then, just select the cipher type that it is, and hit decode! It will show you your decoded text (we can
 call this the plaintext), and you can hover over it and click to copy it to your clipboard. Simple!

## How it was made

This project started off as an idea for helping out on Science Olympiad Codebusters questions, where the student needs to quickly solve a cipher. If this app was on a compact device, such as an apple watch, this 
would provide a lot of assistance for the test taker. I soon realized that i was in over my head, and i didn't know any swift, even after getting a mac mini from High Seas specifically to learn swift
(procrastination). I pivoted to a python file, where i quickly learned that i was cooked as well. I started with a caesar cipher. I tried testing each combination of shifts, but i saw that there would be 25 outcomes that would need
to be checked by the human, and i didn't want that. I tried getting a bigram scoring algorithm, but it didn't go too well. Fast-forward a lot of time, i had started on the vigenere cipher. I did not make most 
of the mistakes i made with the caesar cipher. I learnt about chi-squared, which is a way of scoring text on the basis of how close it is to real english, and used that along with other techinques to accomplish really
 fast, and reliable caesar and vigenere ciphers. (btw the vigenere is done without having any key of some sort). On a Science olympiad test, baconians take a lot of time, but they have a lot of payout.
  I thought that it would be really easy to add, and honestly, it was. I just added a thing that converts it and that's basically it! Baconians are really just like getting a value from a dictionary
