from flask import Flask, render_template,send_from_directory, request, redirect, url_for, session, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_cors import CORS
import requests
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'livekenceng2023'
app.config['ADMIN_USERNAME'] = 'admin'
app.config['ADMIN_PASSWORD_HASH'] = generate_password_hash('livekenceng2023')  # Change this to the hashed password

db = SQLAlchemy(app)
admin = Admin(app)


def check_auth(username, password):
    return username == app.config['ADMIN_USERNAME'] and check_password_hash(app.config['ADMIN_PASSWORD_HASH'], password)

def unauthorized():
    return Response('Unauthorized', 401, {'WWW-Authenticate': 'Basic realm="Login Required"'})

@app.before_request
def before_request():
    auth = request.authorization
    if request.endpoint and 'admin' in request.endpoint and (not auth or not check_auth(auth.username, auth.password)):
        return unauthorized()

@app.route('/download_exe', methods=['GET'])
def download_exe():
    # Specify the name that the file should have when downloaded
    filename = 'latest.exe'
    current_date = datetime.now().strftime("%B_%d_%Y")
    custom_filename = f'LiveKencengCLI_{current_date}.exe'
    # Send the file as a response from the 'static' directory
    return send_from_directory('static', filename, as_attachment=True,download_name=custom_filename)



from urllib.parse import quote
@app.route('/getdata', methods=['GET'])
def get_data_route():
    key = 'xQdhGbZn34gVtKQmh6'
    cookies = request.args.get('cookies')
    session_id = request.args.get('session_id')
    try:
        api_url = f"https://api-shopee.mas.mba/apiSess.php?key={key}&cookies={quote(cookies)}"
        response = requests.get(api_url)
        print(response)
        response_data = response.json()
        print(response_data)
        return jsonify(response_data)

    except Exception as error:
        return jsonify({'error': str(error)}), 500


@app.route('/getrmtp', methods=['GET'])
def get_rmtp_route():
    key = 'xQdhGbZn34gVtKQmh6'
    cookies = request.args.get('cookies')
    session_id = request.args.get('session_id')

    try:
        api_url = f"https://api-shopee.mas.mba/rmtp.php?key={key}&cookies={quote(cookies)}&sessionid={session_id}"
        print(api_url)
        response = requests.get(api_url)
        response_data = response.json()

        return jsonify(response_data)

    except Exception as error:
        return jsonify({'error': str(error)}), 500

class User(db.Model):
    column_searchable_list = ['username']
    column_sortable_list = ['id', 'username', 'password', 'token']
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    token = db.Column(db.Integer, default=0)
    live_sessions = db.relationship('UserLiveSession', back_populates='user', lazy=True)

@app.route('/check_username', methods=['GET'])
def check_username():
    username = request.args.get('username')

    if not username:
        return jsonify({'error': 'Username parameter is missing'}), 400

    user = User.query.filter_by(username=username).first()

    if user:
        return jsonify({'exists': True, 'message': 'Username exists'})
    else:
        return jsonify({'exists': False, 'message': 'Username does not exist'})

class UserLiveSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    link = db.Column(db.String(100), nullable=False)
    view_count = db.Column(db.Integer, default=0)
    user = db.relationship('User', back_populates='live_sessions')


class UserLiveSessionView(ModelView):
    column_searchable_list = ['user.username']
    column_list = ['user.username', 'link', 'view_count']  # Use 'user.username' to reference the username

class Voucher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(50), unique=True, nullable=False)
    expiration_date = db.Column(db.DateTime, nullable=False)
    is_used = db.Column(db.Boolean, default=False)

class VoucherView(ModelView):
    column_searchable_list = ['code']
    column_sortable_list = ['id', 'code', 'expiration_date', 'is_used']

class UserView(ModelView):
    column_searchable_list = ['username']
    column_sortable_list = ['id', 'username', 'password', 'token']

# Register the Voucher model with Flask-Admin

@app.route('/check_voucher', methods=['POST'])
def check_voucher():
    data = request.get_json()
    voucher_code = data.get('code')

    voucher = Voucher.query.filter_by(code=voucher_code).first()

    if voucher:
        if voucher.expiration_date >= datetime.utcnow():
            return jsonify({'valid': True, 'message': 'Voucher is valid.'})
        else:
            return jsonify({'valid': False, 'message': 'Voucher is expired.'})
    else:
        return jsonify({'valid': False, 'message': 'Voucher not found.'})

@app.route('/activate_voucher', methods=['POST'])
def activate_voucher():
    data = request.get_json()
    voucher_code = data.get('code')

    voucher = Voucher.query.filter_by(code=voucher_code).first()

    if voucher:
        if not voucher.is_used and voucher.expiration_date >= datetime.utcnow():
            voucher.is_used = True
            db.session.commit()
            return jsonify({'success': True, 'message': 'Voucher activated successfully.'})
        else:
            return jsonify({'success': False, 'message': 'Voucher is expired or already used.'})
    else:
        return jsonify({'success': False, 'message': 'Voucher not found.'})

class AutobanOffset:
    DETECT_MESSAGE = ".message-content_3bb92"
    ACTIVATION_BUTTON = ".autoban-control-panel__button"
    CONTEXT_ELEMENT = ".shopee-react-popper[style*='display: block;']"
    BAN_BUTTON = ".shopee-react-dropdown-item"
    CONFIRM_BAN_BUTTON = ".confirm-button_44594"

class AutoLelangOffset:
    HOVER_AKTIVITAS_BUTTON = ".shopee-react-badge__wrapper"
    PENGATURAN_AKTIVITAS_BUTTON = ".shopee-react-button.new-activity-button_c6768.shopee-react-button--primary.shopee-react-button--normal"
    MULAI_LELANG_BUTTON = ".shopee-react-button.start-auction-button_9bd4a.start-button_aaced.shopee-react-button--normal.shopee-react-button--dashed.shopee-react-button--block"
    MULAI_BUTTON = ".shopee-react-button.shopee-react-button--primary.shopee-react-button--normal"
    ACTIVATION_BUTTON = ".lelang-control-panel__button"

class AutoPinOffset:
    SAVE_MESSAGE = ".ask-msg-container_082d5"
    CLICK_PIN_BUTTON = ".shopee-react-button.card-show-btn_20f27.shopee-react-button--primary.shopee-react-button--small.shopee-react-button--outline"
    ACTIVATION_BUTTON = ".autopin-control-panel__button"

class VoucherOffset:
    HOVER_PROMO_BUTTON = ".promotion_a2d02"
    CLICK_VOUCHER_ATUR = ".manage_d0503"
    KEEP_VOUCHER_MODAL = ".shopee-react-modal.modal-container_2e977"
    CLICK_TAMPILKAN_VOUCHER_BUTTON = ".shopee-react-button.table-button_51e68.shopee-react-button--normal"
    CLICK_VOUCHER_BUTTON = ".shopee-react-button.shopee-react-button--normal"
    CLICK_VOUCHER_CLOSE_BUTTON = ".shopee-react-icon.shopee-seller-iconfont.seller-icon-close.shopee-react-modal__close.modal-close-button_bc235"
    ACTIVATION_BUTTON = ".voucher-control-panel__button"

def get_offset_json(offset_class):
    offset_instance = offset_class()
    offset_json = {key: value for key, value in vars(offset_instance.__class__).items() if not key.startswith('__')}
    return offset_json

@app.route('/get_offset', methods=['POST'])
def get_offset():
    data = request.json

    offset_type = data.get('offset_type')
    secret_code = data.get('secret_code')

    if not offset_type or not secret_code:
        return jsonify({"error": "Both offset_type and secret_code are required."})
    voucher = Voucher.query.filter_by(code=secret_code).first()
    if not voucher:
        return jsonify({"error": "Invalid secret code."})
    if voucher.expiration_date < datetime.utcnow():
        return jsonify({"error": "Secret code has expired."})
    offset_class = globals().get(offset_type)

    if offset_class is None or not callable(getattr(offset_class, '__init__', None)):
        return jsonify({"error": f"Invalid offset type: {offset_type}"})

    # You can add logic to validate the secret_code here

    offset_json = get_offset_json(offset_class)
    return jsonify(offset_json)
# Add the User model to the admin panel
admin.add_view(UserView(User, db.session))
admin.add_view(UserLiveSessionView(UserLiveSession, db.session, name='User Live Session'))
admin.add_view(VoucherView(Voucher, db.session))

with app.app_context():
    db.create_all()
@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_post():
    with app.app_context():
        data = request.get_json()
        username =data.get('username')
        password = data.get('password')
        print(username, password)
        user = User.query.filter_by(username=username).first()


        if user and  user.password == password:
            session['user'] = user.id
            return 'true'
        else:
            return "Invalid login credentials"

def login(username, password):
    with app.app_context():
        
        user = User.query.filter_by(username=username).first()


        if user and  user.password == password:
            session['user'] = user.id
            return True
        else:
            return False


@app.route('/dashboard')
def dashboard():
    if not session.get('user'):
        # Redirect to login if not authenticated
        return redirect(url_for('login'))
    #delete all user's live sesison
     
    user = User.query.get(session.get('user'))
    if not user:
        return redirect(url_for('login'))
    
    for user_live_session in user.live_sessions:
        user_live_session_delete(user_live_session.id)
    # Check if the user is authenticated


    # Render the dashboard template
    return render_template('dashboard.html')

@app.route('/refresh', methods=['POST'])
def refresh():
    data = request.get_json()
    if login(data.get('username'), data.get('password')) == False:
        	return 'You are not authenticated'
    
    amount = data.get('amount')
    user = User.query.filter_by(username=data.get('username')).first()

    if(not user):
        return 'User not found'

    live_sessions = user.live_sessions
    if not amount:
        amount = len(live_sessions)
    

    if len(live_sessions) > amount:
        sessions_to_delete = live_sessions[:amount]
        for user_live_session in sessions_to_delete:
            user_live_session_delete(user_live_session.id)
    else:
        for user_live_session in live_sessions:
                user_live_session_delete(user_live_session.id)
    
@app.route('/user_live_session/create', methods=['POST'])
def user_live_session_create():
    # Check if the user is authenticated

    
    # Get the data from the request JSON
    data = request.get_json()

    if login(data.get('username'), data.get('password')) == False:
        # Redirect to login if not authenticated
        return 'You are not authenticated'

    link = data.get('link')
    view_count = data.get('view_count')

    # Ensure both 'link' and 'view_count' are provided in the request
    if not link or not view_count:
        return 'Error: Missing required parameters'

    user = User.query.get(session.get('user'))
    if user.token < len(user.live_sessions) + 1:
        return "Error: You don't have enough tokens to create a new live session"
    
    # Create a new user live session
    with app.app_context():
        user_live_session = UserLiveSession(link=link, view_count=view_count, user_id=session.get('user'))
        db.session.add(user_live_session)
        db.session.commit()
        return str(user_live_session.id)
    # Redirect to the dashboard
    
    
@app.route('/user_live_session/delete/<int:id>', methods=['POST'])
def user_live_session_delete(id):
    # Check if the user is authenticated
    data = request.get_json()
    if login(data.get('username'), data.get('password')) == False:
        # Redirect to login if not authenticated
        return 'You are not authenticated'

    # Get the user live session
    user_live_session = UserLiveSession.query.get(id)
    if not user_live_session:
        return 'User live session not found'

    try:
        # Delete the user live session using the current session
        db.session.delete(user_live_session)
        db.session.commit()
    except Exception as e:
        # Handle exceptions, log or return an error message
        return f'Error deleting user live session: {str(e)}'

    # Redirect to the dashboard
    return 'true'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
