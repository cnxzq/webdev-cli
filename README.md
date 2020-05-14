# webdev-cli
## instsll
```npm install webdev-cli -g```
## use command
### 1. webdev-cli/webdev npm publish [git-message] [version]
* Update the version number in the package.json file
  > default:version + 0.0.1
* run git add .
* run git common -m [git-message]
* run git push
* run npm publish
> examples:   
    > webdev npm publish   
    > webdev npm publish "update package.json"   
    > webdev npm publish "update package.json" 3.0.25   
### 2. webdev-cli/webdev git push [git-message]
* run git add .
* run git common -m [git-message]
* run git push

## import
```
import {git,npm,serve} from "webdev-cli"
git.push();

npm.publish();

serve()
```
