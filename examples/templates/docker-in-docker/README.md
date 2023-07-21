---
name: Docker in Docker
description: Develop inside Docker and build Docker images from your workspace
tags: [local, docker]
icon: /icon/docker.png
---

# docker

To get started, run `coder templates init`. When prompted, select this template.
Follow the on-screen instructions to proceed.

## Editing the image

Edit the `Dockerfile` and run `coder templates push` to update workspaces.

## code-server

`code-server` is installed via the `startup_script` argument in the `coder_agent`
resource block. The `coder_app` resource is defined to access `code-server` through
the dashboard UI over `localhost:13337`.

## docker in docker

The `docker` CLI is pre-installed in this template. You can use it to build images and run docker containers.

## Extending this template

See the [kreuzwerker/docker](https://registry.terraform.io/providers/kreuzwerker/docker) Terraform provider documentation to
add the following features to your Coder template:

- SSH/TCP docker host
- Registry authentication
- Build args
- Volume mounts
- Custom container spec
- More

We also welcome contributions!
