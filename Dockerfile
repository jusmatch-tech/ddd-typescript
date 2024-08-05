FROM node:20.1-alpine3.17

#RUN apt-get update && apt-get install -y --no-install-recommends \
#    git
RUN mkdir -p /usr/share/man/man1 && \
    mkdir -p  /etc/apt/sources.list.d && \ 
    echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list && \
    apk update && \
    apk upgrade && \
    apk add ca-certificates && \
    update-ca-certificates &&\
    apk add \
    git \
    openjdk11-jre \
    zsh \
    curl \
    wget \
    procps \
    graphviz

RUN npm install -g @nestjs/cli@8.2.5

#RUN apk add --no-cache wget && \
#    mkdir /root/powerline && \
#    cd /root/powerline && \ 
#    wget https://github.com/powerline/fonts/raw/master/Meslo%20Slashed/Meslo%20LG%20M%20Regular%20for%20Powerline.ttf && \
#    rm -rf /tmp/* 

#RUN apk add powerline

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk"

# adding NestJS CLI
RUN npm install -g @nestjs/cli@10.1.17

# container's user
USER node

WORKDIR /home/node/app

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
    -t https://github.com/romkatv/powerlevel10k \
    -p git \
    -p git-flow \
    -p https://github.com/zdharma-continuum/fast-syntax-highlighting \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions \
    -a 'export TERM=xterm-256color'

RUN echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> ~/.zshrc && \
    echo 'HISTFILE=/home/node/zsh/.zsh_history' >> ~/.zshrc 


#CMD [ "sh" , "-c" , "npm install && tail -f /dev/null" ]
CMD [ "tail" , "-f" , "/dev/null" ]
