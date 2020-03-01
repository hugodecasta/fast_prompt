// ---------------------------------------------- REQUIRES

const rl = require('readline-sync')
const colors = require('colors')

// ---------------------------------------------- CORE

function create_commands(commands,alias={}) {

    let has_alias = {}
    
    for(let ali in alias) {
        has_alias[alias[ali]] = ali
        commands[ali] = commands[alias[ali]]
    }

    commands.help = function() {
        console.log('commands:')
        for(let comm in commands) {
            if(comm in alias) {
                continue
            }
            let str = comm.cyan
            if(comm in has_alias) {
                str += (' ('+has_alias[comm]+')').gray
            }
            console.log('   >',str)
        }
    }
    commands.exit = function() {
        return false
    }

    return commands
}

function ask_data() {
    let askers = Array.from(arguments)
    let map = {}
    for(let asker of askers) {
        map[asker] = rl.question('   '+asker+' ? ')
    }
    return map
}

function looper(name,commands) {

    while(true) {

        let input = rl.question(name)
        let words = input.split(' ')
        let command = words[0]
        let args = words.slice(1)

        if(command in commands) {
            try {
                let ret = commands[command](...args)
                if(ret === false) {
                    break
                }
                if(typeof ret == 'string') {
                    console.log('   '+ret)
                }
            } catch(err) {
                console.log(('error: '+err).red)
            }
        } else {
            console.log(('error: command not found !').red)
        }

    }
}

// ---------------------------------------------- EXPORTS

exports.create_commands = create_commands
exports.looper = looper
exports.ask_data = ask_data