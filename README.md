# IPFS Uploader

The file upload component for ipfs which based on [chakra ui](https://chakra-ui.com/).
Now we only support [pinata](https://www.pinata.cloud/).

# Getting started

## Installation

### @osaguild/ipfs-uploader

```yarn
yarn add @osaguild/ipfs-uploader
```

### dependencies for react

This repository runs on react so you need to install react and react-dom to dependencies

```yarn
yarn add react react-dom
yarn add react-scripts -D
```

If you use typescript, you need to install @types/react and @types/react-dom

```yarn
yarn add @types/react @types/react-dom -D
```

### dependencies for other packages

This repository use [chakra-ui](https://chakra-ui.com/) and [axios](https://www.axios.com/).
So you need to install these packages.

```yarn
yarn add @chakra-ui/react @emotion/react @emotion/styled axios framer-motion -D
```

# Release to npm

```yarn
yarn rollup
yarn login
yarn publish --access=public
```
