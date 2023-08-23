to run server go to backend directory and type
`docker compose run -d`
after downloading containers and installing all node dependencies run
`make run-init-docker`
this command initializes prisma types with db migration and seed from csv file

now app should be up and running on port 3000
open browser and visit http://localhost:3000/state/California

it should show bunch of data


to run frontend is required to have flutter 
to run desktop application on linux run
`flutter run -d linux`

also working as website
`flutter run -d chrome`

or android/ios app
