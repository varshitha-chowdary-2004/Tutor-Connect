// Handle register button clicks
document.querySelector('.custom-registerstudent-button').addEventListener('click', function () {
    document.getElementById('studentRegistrationForm').style.display = 'block';
    document.getElementById('tutorRegistrationForm').style.display = 'none';
    document.getElementById('studentRegistrationForm').scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('.custom-registertutor-button').addEventListener('click', function () {
    document.getElementById('tutorRegistrationForm').style.display = 'block';
    document.getElementById('studentRegistrationForm').style.display = 'none';
    document.getElementById('tutorRegistrationForm').scrollIntoView({ behavior: 'smooth' });
});

// Show appropriate section based on navigation
function showSection(sectionId) {
    document.getElementById('findTutorSection').style.display = 'none';
    document.getElementById('findStudentSection').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Set up navigation click handlers
document.getElementById('custom-nav-link2').addEventListener('click', function() {
    showSection('findTutorSection');
});
document.getElementById('custom-nav-link3').addEventListener('click', function() {
    showSection('findStudentSection');
});



// Update cities when state changes in student search
document.getElementById('searchState').addEventListener('change', function() {
    const citySelect = document.getElementById('searchCity');
    const selectedState = this.value;
    citySelect.innerHTML = '<option value="">Select City</option>';
    
    if (selectedState && selectedState !== 'Select State') {
        stateCities[selectedState].forEach(city => {
            const option = document.createElement('option');
            option.text = city;
            option.value = city;
            citySelect.add(option);
        });
    }
});

// State to cities mapping
const stateCities = {
    'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam'],
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool'],
    'Tamilnadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
    'Maharastra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    'Uttarpradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut'],
    'Delhi': ['New Delhi', 'Delhi Cantonment', 'Noida', 'Gurgaon', 'Faridabad'],
    'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
    'Kerela': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain']
};

// Update cities when state changes in find student registration 
document.getElementById('state').addEventListener('change', function () {
    const citySelect = document.getElementById('city');
    const selectedState = this.value;

    // Clear previous options
    citySelect.innerHTML = '<option>Select City</option>';

    // Add new options if state is selected
    if (selectedState && selectedState !== 'Select State') {
        stateCities[selectedState].forEach(city => {
            const option = document.createElement('option');
            option.text = city;
            option.value = city;
            citySelect.add(option);
        });
    }
});
// in tutor registration 
document.getElementById('states').addEventListener('change', function () {
    const citySelect = document.getElementById('citys');
    const selectedState = this.value;

    // Clear previous options
    citySelect.innerHTML = '<option>Select City</option>';

    // Add new options if state is selected
    if (selectedState && selectedState !== 'Select State') {
        stateCities[selectedState].forEach(city => {
            const option = document.createElement('option');
            option.text = city;
            option.value = city;
            citySelect.add(option);
        });
    }
});


// Enhanced tutor data array

document.getElementById('tutorSearchForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const subject = document.getElementById('searchSubject').value;
    const experience = document.getElementById('searchExperience').value;
    const gender = document.getElementById('searchGender').value;
    const qualification = document.getElementById('searchQualification').value;

    document.getElementById('tutorResults').innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Searching tutors...</div>';

    try {
        const queryParams = new URLSearchParams({
            subjects: subject,
            experience: experience,
            gender: gender,
            qualification: qualification
        });

        const response = await fetch(`http://localhost:5000/api/tutors/search?${queryParams}`);
        const tutors = await response.json();
        console.log("Searching with:", {
            subject,
            experience,
            gender,
            qualification
        });
        
        displayTutors(tutors);
    } catch (error) {
        console.error(error);
        document.getElementById('tutorResults').innerHTML = '<p class="text-danger">Error fetching tutors</p>';
    }
});



// Display tutors in results container
function displayTutors(tutorsToDisplay) {
    const resultsContainer = document.getElementById('tutorResults');
    resultsContainer.innerHTML = '';

    if (tutorsToDisplay.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center">No tutors found matching your criteria.</p>';
        return;
    }

    tutorsToDisplay.forEach(tutor => {
        const tutorCard = document.createElement('div');
        tutorCard.className = 'tutor-card';
    
        // Combine subjects list if needed
        const subjectsList = tutor.subjects?.map(s => `${s.name} (${s.level})`).join(', ') || '';
    
        tutorCard.innerHTML = `
            <div class="tutor-header">
                <h3>${tutor.name}</h3>
            </div>
            <p class="tutor-qualification"><i class="fas fa-graduation-cap"></i> ${tutor.qualification}</p>
            <p class="tutor-experience"><i class="fas fa-briefcase"></i> ${tutor.experience} experience</p>
            <div class="tutor-phone" style="display:none; margin-bottom: 10px;">
                📞 ${tutor.phone}
            </div>
            <div class="tutor-actions">
                <button class="tutor-contact-btn"><i class="fas fa-envelope"></i> Contact</button>
            </div>
        `;
    
        const contactBtn = tutorCard.querySelector('.tutor-contact-btn');
        const phoneDiv = tutorCard.querySelector('.tutor-phone');
    
        contactBtn.addEventListener('click', () => {
            phoneDiv.style.display = phoneDiv.style.display === 'none' ? 'block' : 'none';
        });
        
    
        resultsContainer.appendChild(tutorCard);
    });
    
}



// Hide tutor section initially
document.getElementById('findTutorSection').style.display = 'none';
document.getElementById('findStudentSection').style.display = 'none';


// tutor registration backend
document.querySelector('#tutorRegistrationForm form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
        name: document.querySelector('input[placeholder="Enter Your Name"]').value,
        phone: document.querySelector('input[placeholder="Enter Your Phone"]').value,
        email: document.querySelector('input[placeholder="Enter Your Email"]').value,
        whatsapp: document.querySelector('input[placeholder="Enter Your WhatsApp Number"]').value,
        gender: document.getElementById('gender').value,
        dob: document.querySelector('input[type="date"]').value,
        qualification: document.getElementById('qualification').value,
        college: document.querySelector('input[placeholder*="College"]').value,
        applyFor: document.getElementById('applyFor').value,
        experience: document.getElementById('experience').value,
        grades: Array.from(document.getElementById('grades').selectedOptions).map(o => o.value),
        subjects: Array.from(document.getElementById('subjects').selectedOptions).map(o => o.value),
        country: document.getElementById('country').value,
        state: document.getElementById('states').value,
        city: document.getElementById('citys').value,
        language: document.getElementById('language').value,
        pincode: document.querySelector('input[placeholder*="Pincode"]').value,
        address: document.querySelector('input[placeholder*="Address"]').value
    };

    console.log("Data being submitted:", data); // Add this for debugging

    try {
        const response = await fetch('http://localhost:5000/api/tutors/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
    } catch (err) {
        alert("Error submitting tutor form");
        console.error(err);
    }
});

// student registration backend
document.querySelector('#studentRegistrationForm form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById('studentName').value,
        language: document.getElementById('studentLanguage').value,
        board: document.getElementById('studentBoard').value,
        class: document.getElementById('studentClass').value,
        mode: document.getElementById('studentMode').value,
        preferredTutor: document.getElementById('preferredTutor').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        country: document.getElementById('country').value,
        state: document.getElementById('state').value,
        city: document.getElementById('city').value,
        address: document.getElementById('studentAddress').value
    };
    console.log("Data being submitted:", data);

    try {
        const response = await fetch('http://localhost:5000/api/students/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
    } catch (err) {
        alert("Error submitting student form");
        console.error(err);
    }
});

//student search
document.getElementById('studentSearchForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const board = document.getElementById('searchBoard').value;
    const classValue = document.getElementById('searchClass').value;
    const state = document.getElementById('searchState').value;
    const city = document.getElementById('searchCity').value;

    document.getElementById('studentResults').innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Searching students...</div>';

    try {
        const query = new URLSearchParams({
            board,
            class: classValue,
            state,
            city
        });

        const res = await fetch(`http://localhost:5000/api/students/search?${query}`);
        const students = await res.json();
        displayStudents(students);
    } catch (err) {
        console.error(err);
        document.getElementById('studentResults').innerHTML = '<p class="text-danger">Error fetching students</p>';
    }
});
//student search display
function displayStudents(students) {
    const resultsContainer = document.getElementById('studentResults');
    resultsContainer.innerHTML = '';

    if (students.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center">No students found matching your criteria.</p>';
        return;
    }

    students.forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.className = 'tutor-card'; // Use tutor-card class for consistent styling
        studentCard.innerHTML = `
            <div class="tutor-header">
                <h3>${student.name}</h3>
            </div>
            <p class="tutor-qualification"><strong>Class:</strong> ${student.class}, <strong>Board:</strong> ${student.board}</p>
            <p class="tutor-experience"><strong>Mode:</strong> ${student.mode}</p>
            <p class="tutor-experience"><strong>Gender Preference:</strong> ${student.preferredTutor}</p>
            <p class="tutor-experience"><strong>Location:</strong> ${student.city}, ${student.state}</p>
            <div class="tutor-phone" style="display:none; margin-bottom: 10px;">
                📞 ${student.phone}
            </div>
            <div class="tutor-actions">
                <button class="tutor-contact-btn"><i class="fas fa-envelope"></i> Contact</button>
            </div>
        `;
        const contactBtn = studentCard.querySelector('.tutor-contact-btn');
        const phoneDiv = studentCard.querySelector('.tutor-phone');

        contactBtn.addEventListener('click', () => {
            phoneDiv.style.display = phoneDiv.style.display === 'none' ? 'block' : 'none';
        });

        resultsContainer.appendChild(studentCard);
    });
}

