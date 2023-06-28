let addrequirementsBtn = document.getElementById('addrequirementsBtn');
let requirementList = document.querySelector('.requirementList');
let requirementDiv = document.querySelectorAll('.requirementDiv')[0];

addrequirementsBtn.addEventListener('click', function(){
  let newrequirements = requirementDiv.cloneNode(true);
  let input = newrequirements.getElementsByTagName('input')[0];
  input.value = '';
  requirementList.appendChild(newrequirements);
});