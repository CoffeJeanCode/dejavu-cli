FROM oven/bun:1

RUN apt-get update  \
    && apt-get install -y \
      git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /app

WORKDIR /app

COPY . /app

CMD ["tail", "-f", "/dev/null"]
