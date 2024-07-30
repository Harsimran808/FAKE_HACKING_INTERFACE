document.addEventListener('DOMContentLoaded', () => {//Ensures that the script runs only after the HTML document has been fully loaded
    const commandInput = document.getElementById('command');
    const output = document.getElementById('output');//output refers to the div where command responses are displayed.
    const usernameInput = document.getElementById('username-input');
    const submitUsernameButton = document.getElementById('submit-username');

    let username = '';

    // Define available commands and their responses
    const commands = {
        'help': 'Available commands: help, username, next , ls , info , ping , outcome',
        'next': 'fetching the data of user ',
        'ls': 'Documents  Downloads  Projects  Pictures  Videos',
        'info': () => {
            if (username) {
                return `user is ${username} and we\'re getting into users phone`;
            } else {
                return 'No username has been set. Please use the username command to set it.';
            }
        },
        'ping': 'Pinging 127.0.0.1... Reply from 127.0.0.1: bytes=32 time<1ms TTL=128',
        'outcome':'Sucess in Hacking user\'s device'
       
    };

    // Function to execute commands
    // Executes the associated response. If the response is a function, it calls it; otherwise, it displays the text response.
    // Scrolls the output to the bottom to show the most recent command output.
    function executeCommand(command) {
        const response = commands[command] || `Command '${command}' not found. Type 'help' for a list of commands.`;
        if (typeof response === 'function') {
            output.textContent += `\n ${command}\n${response()}`;
        } else {
            output.textContent += `\n ${command}\n${response}`;
        }
        output.scrollTop = output.scrollHeight;
    }

    // Event listener for command input
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            executeCommand(command);
            commandInput.value = '';
            e.preventDefault();//Clears the input field and prevents the default behavior of the Enter key
        }
    });
    // Event listener for username submission
    submitUsernameButton.addEventListener('click', () => {
        username = usernameInput.value.trim();
        if (username) {
            commands['username'] = `Username set to: ${username}`;
            output.textContent += `\n> username\n${commands['username']}\n`;
            usernameInput.value = '';
        } else {
            output.textContent += `\n> username\nUsername not provided.\n`;
        }
        output.scrollTop = output.scrollHeight;
    });

    // Display an initial welcome message
    output.textContent = 'Welcome to the hacker terminal. Type "help" to see available commands.';
});
