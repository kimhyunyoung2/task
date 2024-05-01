document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function(){
        var content = document.getElementById('content');
        content.style.opacity = 1;
        content.style.transform = 'translateY(0)';
    }, 500);
});

function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    var tabs = document.querySelectorAll('ul li');
    tabs.forEach(tab => {
        if (tab.id === 'tab1' && sectionId === 'section1') {
            tab.classList.add('active');
        } else if (tab.id === 'tab2' && sectionId === 'section2') {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    showSection('section1');
});

const inputField = document.getElementById('inputField');

inputField.addEventListener('keydown', function(event) {
    if (!(
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode === 8 ||
        event.keyCode === 9 ||
        event.keyCode === 13 ||
        (event.keyCode >= 37 && event.keyCode <= 40)
    )) {
        event.preventDefault();
    }
});

inputField.addEventListener('change', function () {
    let value = this.value.replace(/[^0-9]/g, '');
    if (value) {
        this.value = `${value}만원`;
    }
});

inputField.addEventListener('focus', function () {
    this.value = this.value.replace(/만원/g, '');
});

inputField.addEventListener('blur', function () {
    let value = this.value.replace(/[^0-9]/g, '');
    if (value) {
        this.value = `${value}만원`;
    }
});
// prev, next 요소 슬라이드
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section_cont');
    const progressBarWrap = document.getElementById('progressBarWrap');
    const progressBar = document.getElementById('progressBar');
    const buttonContainer = document.querySelector('.button_container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const radios = document.querySelectorAll('.inp_radio');
    let currentSectionIndex = 0;
   
    function updateSelection(self) {
        console.log(self);
        document.querySelectorAll('li').forEach(li => {
            li.classList.remove('selected');
        });

        const checkedRadios = document.querySelectorAll('input[type="radio"]:checked');
        checkedRadios.forEach(checkedRadio => {
            checkedRadio.parentElement.classList.add('selected');
        });
    }

    console.log(radios);
    radios.forEach(radio => {
        radio.addEventListener('change', updateSelection);
    });

    function updateSections() {
        sections.forEach((section, index) => {
            section.style.display = index === currentSectionIndex ? 'block' : 'none';
        });
        updateProgressBar();
        updateButtonVisibility();
        checkInputs();
    }

    function updateProgressBar() {
        if (currentSectionIndex === sections.length - 1) {
            progressBarWrap.style.display = 'none';
        } else {
            progressBarWrap.style.display = '';
            const totalSections = sections.length;
            const progressPercentage = ((currentSectionIndex + 1) / totalSections) * 100;
            progressBar.style.width = progressPercentage + '%';
        }
    }

    function updateButtonVisibility() {
        if (currentSectionIndex === sections.length - 1) {
            buttonContainer.style.display = 'none';
        } else {
            buttonContainer.style.display = '';
        }

        prevButton.disabled = currentSectionIndex === 0;
    }

    function checkInputs() {
        console.log('checkInputs');
        nextButton.disabled = true;

        const selectedRadio = sections[currentSectionIndex].querySelector('input[type="radio"]:checked');
        if (selectedRadio) {
            nextButton.disabled = false;
        }

        if (sections[currentSectionIndex].classList.contains('number')) {
            const numberInput = sections[currentSectionIndex].querySelector('.inp_num');
            if (numberInput && numberInput.value.trim() != '') {
                nextButton.disabled = false;
            } 
        }
    }

    sections.forEach(section => {
        section.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', checkInputs);
        });

        section.querySelectorAll('input[type="text"]').forEach(input => {
            input.addEventListener('input', checkInputs);
        });
    });

    nextButton.addEventListener('click', function() {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            updateSections();
        }
    });

    prevButton.addEventListener('click', function() {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            updateSections();
        }
    });

    updateSections();
});
