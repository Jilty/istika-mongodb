
const { exec } = require("child_process");
const db = require("../models");
const { authJwt } = require("../middlewares");
const config = require("../config/auth.config.js");
const jwt = require("jsonwebtoken");// to be removed

const fs = require('fs');
const yaml = require('js-yaml');
const { response } = require("express");

const moment = require('moment');
const { setTimeout } = require("timers");
const organization = "https://dev.azure.com/njclabsmicrolabs";
var AzureService = require("../services/azureServices.js");
var ProjectService = require("../services/projectServices.js");
var AuthService = require("../services/authService.js");
getToken = (req, res) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, config.secret, (err, decoded) => {
        // console.log(decoded);
        return decoded.id;
    })
};

execShellCommand = (cmd, env) => {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, { env: env }, (error, stdout, stderr) => {
            if (error || !stdout) {
                console.log(error);
                global.io.emit('buildupdate', { message: error, date: moment().format('LLLL'), status: 'console' });
                console.warn('Exit from script' + error);
            }
            console.log(stdout);
            global.io.emit('buildupdate', { message: stdout, date: moment().format('LLLL'), status: 'console' });
            resolve(stdout);
        });
    });
};

const AzureResource = db.azResources;
const Project = db.project;
const BuildPipeline = db.buildPipeline;
const AzureStatus = db.azureStatus;
const BuildProject = db.buildProject;
const GitHub = db.git;
var env = Object.create(process.env);

updateGitProject = (projectid, giturl) => {
    Project.updateMany({ _id: projectid }, { $set: { gitUrl: giturl } }, (err, stat) => {
        if (err) {
            res.status(500).send({ message: "something occured" });
        }
    })
}
exports.azureresources = async function (req, res) {
    try {
        let azResource = await AzureService.getAzureResources(AuthService.getToken(req), req.body);
        res.status(200).send(azResource);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.updateazureresources = async function (req, res) {
    try {
        let azResource = await AzureService.updateAzureResources(AuthService.getToken(req), req);
        res.status(200).send(azResource);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getazdevops = async function (req, res) {
    try {
        let azResource = await AzureService.getAzureDevops(AuthService.getToken(req), req.body);
        res.status(200).send(azResource);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.azureresource = async function (req, res) {
    try {
        let azResource = await AzureService.getAzureResource(AuthService.getToken(req), req.body);
        res.status(200).send(azResource);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteresource = async function (req, res) {
    console.log(req.body.id)
    try {
        let azResource = await AzureService.deleteAzureResources(AuthService.getToken(req), req.body.id);
        res.status(200).send(azResource);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

}
exports.checkakscreated = async function (req, res) {
    try {
        let aksCreated = await AzureService.checkAksStatus(AuthService.getToken(req), req.body.aks_cluster_name);
        if (aksCreated.length > 0) {
            res.status(200).send({ message: "Success" });
        } else {
            res.status(400).send({ message: "AKS not created / not found" });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
updateStatus = (username, id, item) => {
    if (item == 'login') {
        AzureStatus.updateMany({ username: username, projectId: id }, { $set: { login: true } }, (err, stat) => {
            if (err) {
                res.status(500).send({ message: "something occured" });
            }
        })
    }
    if (item == 'devops') {
        AzureStatus.updateMany({ username: username, projectId: id }, { $set: { devops: true } }, (err, stat) => {
            if (err) {
                res.status(500).send({ message: "something occured" });
            }
        })
    }
    if (item == 'buildvar') {
        AzureStatus.updateMany({ username: username, projectId: id }, { $set: { buildvar: true } }, (err, stat) => {
            if (err) {
                res.status(500).send({ message: "something occured" });
            }
        })
    }
    if (item == 'build') {
        AzureStatus.updateMany({ username: username, projectId: id }, { $set: { build: true } }, (err, stat) => {
            if (err) {
                res.status(500).send({ message: "something occured" });
            }
        })
    }
}
updateProject = (project, id, rg) => {
    Project.updateMany({ projectName: project }, { $set: { buildId: id, buildComplete: true, resourceGroupName: rg } }, (err, project) => {
        console.log("Project Build updated");
    })
}
checkbuild = async function (id, rg) {

    try {
        AzureService.checkBuildStatus(id, rg);
    } catch (e) {
        console.log('Something occured');
    }
}
exports.createresource = async function (req, res) {
    try {
        let createdResource = await AzureService.createResources(AuthService.getToken(req), req.body);
        res.status(200).send({ resources: createdResource });
    } catch (e) {
        res.status(400).send({ message: 'Could not save resources' + e });
    }


}
exports.createdevops= async function (req, res) {
    try {
        let createdResource = await AzureService.createDevops(AuthService.getToken(req), req.body);
        res.status(200).send({ resources: createdResource });
    } catch (e) {
        res.status(400).send({ message: 'Could not save resources' + e });
    }


}
exports.getaksstatus = async function (req, res) {
    try {
        let azResource = await AzureService.getAksStatus(AuthService.getToken(req), req);;
        res.status(200).send({ azResource });
    } catch (e) {
        res.status(400).send({ message: 'Could not save retrieve aks status' });
    }
}

exports.creategitrepos = (req, res) => {
    console.log(req.body);
    console.log(AuthService.getToken(req));
    const github = new GitHub(
        {
            username: AuthService.getToken(req),
            gitRepo: req.body.gitRepo,
            gitUsername: req.body.gitUsername,
            gitPat: req.body.gitPat
        }
    );
    env.gitUsername = req.body.gitUsername;
    env.github_token = req.body.gitPat;
    env.gitRepo = req.body.gitRepo;
    env.cloneOrCreate = "-n";
    env.codeRepo = "";
    // github.save((err, response) => {
    //     if (err) {
    //         res.status(500).send({ message: 'Error saving github repo' })
    //     }
    //     res.status(200).send({ message: 'Git hub saved', data: response })
    // })
    execShellCommand("sh git-repo-create.sh", env).then(shelres => {
        console.log(shelres);
        github.save((err, response) => {
            if (err) {
                res.status(500).send({ message: 'Error saving github repo' })
            }
            res.status(200).send({ message: 'Git hub saved', data: response })
        })
    })

}
exports.getgitrepos = (req, res) => {
    // let token = req.headers["x-access-token"];
    // jwt.verify(token, config.secret, (err, decoded) => {
    //     console.log(decoded);
    // })
    GitHub.find({ username: AuthService.getToken(req) }, (err, github) => {
        if (err) {
            res.status(404).send({ message: "No github repos for user" });
        }
        // console.log(github);
        res.status(200).send({ github });
    })
}
exports.deletegitrepos = (req, res) => {
    GitHub.deleteMany({ username: AuthService.getToken(req) }, (err, github) => {
        if (err) {
            res.status(404).send({ message: "No github repos for user", data: null });
        }
        res.status(200).send({ message: 'Git hub deleted', data: github });
    })
}
exports.deletegitrepo = (req, res) => {
    GitHub.deleteMany({ username: AuthService.getToken(req), _id: req.query.id }, (err, github) => {
        if (err) {
            res.status(404).send({ message: "No github repos for user", data: null });
        }
        res.status(200).send({ message: 'Git hub deleted', data: github });
    })
}
exports.deleteproject = (req, res) => {

    Project.deleteMany({ username: AuthService.getToken(req), _id: req.body.id }, (err, response) => {
        console.log(response);
        if (err) {
            res.status(500).send({ message: 'Something happend while deleting' });
        }
        if (response.deletedCount > 0)
            res.status(200).send({ message: 'Project Deleted' });
        else
            res.status(200).send({ message: 'Could not delete project' });
    })
};
exports.deleteprojects = (req, res) => {

    Project.deleteMany({ username: AuthService.getToken(req) }, (err, response) => {
        console.log(response);
        if (err) {
            res.status(500).send({ message: 'Something happend while deleting' });
        }
        if (response.deletedCount > 0)
            res.status(200).send({ message: 'Projects Deleted' });
        else
            res.status(200).send({ message: 'Could not delete project' });
    })
};


exports.getazstatus = (req, res) => {
    AzureStatus.find({ username: AuthService.getToken(req), projectId: req.query.id }, (err, status) => {
        if (err) {
            res.status(404).send({ message: "No projects found for user" });
        }
        res.status(200).send(status);
    })
}
exports.getprojectbuild = async function (req, res) {
    try {
        let projectBuild = await AzureService.getProjectBuild(AuthService.getToken(req), req);
        res.status(200).send({ projectBuild });
    } catch (e) {
        res.status(404).send({ message: "No build found" });
    }
}
exports.deleteprojectbuild = async function (req, res) {
    try {
        let projectBuild = await AzureService.deleteProjectBuild(AuthService.getToken(req), req);
        res.status(200).send({ projectBuild });
    } catch (e) {
        res.status(404).send({ message: "No build found" });
    }
}
exports.saveprojectbuild = (req, res) => {
    try {
        let azureBuild = AzureService.saveProjectBuild(AuthService.getToken(req), req);
        res.status(200).send(azureBuild);
    } catch (e) {
        res.status(400).send({ message: "Error uploading Build:", cause: e.message })
    }
}

exports.createrelease = (req, res) => {

}
exports.deployapplication = (req, res) => {
    Project.find({ username: AuthService.getToken(req), projectName: req.body.projectName, _id: req.body.id }, (err, projectDetails) => {
        if (err) {
            res.status(400).send({ message: 'Project not found' });
        }
        // return projectDetails;
        env.projectName = projectDetails[0].projectName;
        console.log(projectDetails);
        AzureResource.find({ username: AuthService.getToken(req), resource_group_name: req.body.resourceGroupName }, (err, resources) => {
            console.log(resources);
            env.azure_container_registry_name = resources[0].azure_container_registry_name;
            env.containerRepository = resources[0].containerRepository;
            // let yamlStr = yaml.safeDump(data);
            // fs.writeFileSync('data-out.yaml', yamlStr, 'utf8');
            env.resource_group_name = resources[0].resource_group_name;
            env.aks_cluster_name = resources[0].aks_cluster_name;
            env.kubectl_secret_name = projectDetails[0]._id + env.aks_cluster_name + Math.random();
            env.kubectl = "az";
            global.io.emit('deployment', { message: "Aks get credentials", date: moment().format('LLLL'), status: 'progress' });
            execShellCommand('sh aks-get-credentials.sh', env).then(result => {
                execShellCommand("sh acr-docker-service-connection.sh", env).then(res => {

                    console.log(res);
                    global.io.emit('deployment', { message: "Creating kubernetes yaml", date: moment().format('LLLL'), status: 'progress' });
                    execShellCommand("sh kube-create-yaml.sh", env).then(res => {
                        console.log(res);
                        console.log('after kubectl secret')
                        let fileContents = fs.readFileSync('./deployment.yaml', 'utf8');
                        let data = yaml.safeLoadAll(fileContents);
                        let nes_data = {
                            imagePullSecrets: [{ name: env.kubectl_secret_name }]
                        }
                        console.log(data)
                        console.log(data);
                        Object.assign(data[0].spec.template.spec, nes_data);
                        let yamlStr = yaml.safeDump(data[0]);
                        fs.writeFileSync('data-out.yaml', yamlStr, 'utf8');
                        global.io.emit('deployment', { message: "Before kubernetes apply", date: moment().format('LLLL'), status: 'progress' });
                        execShellCommand("kubectl apply -f data-out.yaml", env).then(res => {
                            console.log('after kubectl apply')
                            console.log(res);
                            setTimeout(() => {
                                execShellCommand("sh combine-kubectl-files.sh", env).then(result => {
                                    console.log('before kubectl apply')
                                    const interVal = setInterval(() => {
                                        execShellCommand("sh kubectl-get-service.sh", env).then(res => {
                                            var jsonRes = JSON.parse(res);
                                            console.log(jsonRes.status);
                                            if (jsonRes.status && jsonRes.status.loadBalancer && jsonRes.status.loadBalancer.ingress.length) {
                                                clearInterval(interVal);
                                                console.log(jsonRes.status.loadBalancer && jsonRes.status.loadBalancer.ingress[0].ip);
                                                global.io.emit('deployment', { message: jsonRes.status.loadBalancer.ingress[0].ip, date: moment().format('LLLL'), status: 'done' });
                                            }
                                        })
                                    }, 2000)

                                })
                            }, 5000)

                        })

                    })

                })
            })

        });
    })
}

exports.checkbuildsucceded = (req, res) => {
    BuildPipeline.find({ projectId: req.body.id, projectName: req.body.projectName }, (err, buildResponse) => {
        if (err) {
            res.status(400).send({ message: 'Project not found' });
        }
        console.log(buildResponse);
        // res.status(200).send(buildResponse);
        if (buildResponse && buildResponse.length) {
            env.build_id = buildResponse[0].buildId;
            execShellCommand("sh check-pipeline.sh", env).then(result => {
                var buildResult = JSON.parse(result);
                res.status(200).send({ message: buildResult.status });

            })
        }

    })

}
exports.checkbuildstarted = (req, res) => {
    env.projectName = req.query.projectName;
    env.organization = organization;
    console.log(req.query.projectName)
    execShellCommand("sh pipeline-list.sh", env).then(response => {
        var jsonObj = JSON.parse(response);
        console.log(jsonObj);
        if (jsonObj.length) {
            checkbuild(jsonObj[0].id);
            res.status(200).send({ message: 'Build Exists' });
        } else {
            res.status(200).send({ message: 'No Build' });
        }
    })
}
exports.getbuildpipelines = (req, res) => {
    BuildPipeline.find({ username: AuthService.getToken(req), projectId: req.body.id }, (err, buildResponse) => {
        if (err) {
            res.status(400).send({ message: 'Project not found' });
        }
        res.status(200).send(buildResponse)
    })
}