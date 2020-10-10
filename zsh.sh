sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" <&-
#git clone https://github.com/powerline/fonts.git --depth=1 && ./fonts/install.sh && rm -rf fonts
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf && ~/.fzf/install --all  --completion --update-rc
git clone https://github.com/fcamblor/oh-my-zsh-agnoster-fcamblor.git && ./oh-my-zsh-agnoster-fcamblor/install && rm -rf oh-my-zsh-agnoster-fcamblor
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting  ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
mv ~/.zshrc ~/.zshrc.old && sed s/ZSH_THEME=.\*$/ZSH_THEME=\"agnoster\"/g ~/.zshrc.old | sed 's/^plugins=(/plugins=(zsh-autosuggestions zsh-syntax-highlighting fzf /g'  > ~/.zshrc
zsh
