#!/usr/bin/env bash

# execute random number generator x times, each output corresponds to a bee species to be minted.
# Node.js is required just to execute the bias script
declare -a beehashes
beehashes=("bafybeibeik5hz75f4m32ovjmcqczpdcl27safoebmqldruxde4emri5gji" "bafybeigebt2qsruyq7dbhlag2k22hpvgu62fqcld7f7ikpwncx5l7y4lcy" "bafybeibrnwdsonwbtdsjgurasl7malr6wu4qnfd7raeiruddtibh6ewjhy" "bafybeid5a4loyk224ieff42pvt7fvzcbs4qkct544re5id4c3xzklxwi3q" "bafybeifuedbjgszxmy6xviwb2brltcmqtrqq76emxclr6zcd4wcbbmtf44" "bafybeidq3migleu2ofldp5u7efmdhjuqu3ada7bqanwm75hzsrlmrhrtmq")

# for i in {0..20}
# do
specie=$(node bias.js)

# echo 'ipfs://'"${beehashes[$specie]}"
# This POST request, mints chosen image to custom contract to display on Zora marketplace
curl --request POST \
  --url https://api.nftport.xyz/v0/mints/customizable \
  --header 'Authorization: 949057f7-f973-4d80-bc67-45ebff38165e' \
  --header 'Content-Type: application/json' \
  --data '{
  "chain": "rinkeby",
  "contract_address": "0x546CCb7c66eB7C628B2cBAF8e735c9b6e1fE5044",
  "metadata_uri": "ipfs://'"${beehashes[$specie]}"'",
  "mint_to_address": "0x21352FDbE8485190782579323c0a67a9fd14032d"
}' 
# done