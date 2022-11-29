node {

    checkout scm

    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {

        def customImage = docker.build("2kr2m/devops-project")

        /* Push the container to the custom Registry */
        customImage.push()
    }
}
