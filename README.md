## Git and Github

# What is a git?

=> distributed version control system used for tracking changes in source code during development

Here are some key features:

- Version control -> track the changes to their codebase over the time
- Distributed -> every developers working copy of the codebase is a fully fledged repository with its own history and branches.

- Branching and merging
- Committing
- Remote repository -> Git enables developers to work with remote repository hosted server like github, GitLab, Bitbucket

- Pull request
- Merge conflicts

# Github:

web based platform and histing service for version control like git.

1. Git initilization

`git --version`

`git init`

    - create the .git folder

`git config --global user.name "demousername"`
`git config --global user.email "demo_user_email"`

---

- ls - lists the contents of dir
- pwd - prints the current working dir
- cp - copies files or dir
- mv - moves or rename files or directories
- rm - removes or deletes files or dir with the `-rf` command
- `rm -rf node_modules` - delete the dir
- mkdir - create a new dir
- rmdir - removes an empty dir
- touch - create an empty file
- cd - changing dir
- cd /usr/bin - absolute path
- cd .. - moving the previous dir
- `cd ./bin` or `cd bin` - relative path
- `cd` or `cd ~` home dir
- `cd -` previous working dir
- `ls -a` - hidden files and folders
- `ls -l` - show the details info in columns

### Write the good commit message - https://github.com/joelparkerhenderson/git-commit-message

Checkout and create a new branch - `git checkout -b feat/init`
To create a new branch `git branch branch_name`
Checkout branch - `git checkout feat/init`


- delete the branch - `git branch -d feature_name`
- delete the remote branch - `git push origin --delete feature_branch`
- fetch the changes or branches or any update from the parent `git fetch`

github actions - https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments


